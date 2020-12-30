const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/Facebook?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection 

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback (){
    console.log('database is up and running')
})

//  ****************************** Get 'general collection'requests ********************************* 
app.get('/pets', async(req,res) => {
   const pets = await db.collection('pets').find({}).toArray()
    res.json(pets)
})

app.get('/feed', async(req,res) => {
    const feed = await db.collection('feed').find({}).toArray()
    res.json(feed)
})

app.get('/users', async(req,res) => {
    const users = await db.collection('users').find({}).toArray()
    res.json(users)
})

// Get  ********************** 'specific params requests" **********************

app.get('/name/:name', async (req,res) => {
    const name = req.params.name
    const feed = await db.collection('feed').find({name:name}).toArray()
    res.json(feed)
})

app.get('/owner/:owner', async (req,res) => {
    const owner = req.params.owner
    const pets = await db.collection('pets').find({owner:owner}).toArray()
    res.json(pets)
})

app.get('/sex/:sex', async (req,res) => {
    const sex = req.params.sex
    const feed = await db.collection('feed').find({sex:sex}).toArray()
    res.json(feed)
})

app.get('/status/:status', async (req,res) => {
    const status = req.params.status
    const feed = await db.collection('feed').find({status:status}).toArray()
    res.json(feed)
})

// ****************************** post requests ********************************

app.post('/users', async(req,res) => {
    const user = req.body // this takes the info that was stored on the request body
    const x = await db.collection('users').insertOne(user)
    console.log(user)
    res.json('user added successfully')
})

app.post('/feed', async(req,res) => {
    const message = req.body
    const x = await db.collection('feed').insertOne(message)
    console.log('message')
    res.json('message added')
})

app.put('/user/:userId', async(req,res) => {
     const id = req.params.userId
     const email = req.body.email
     const x = await db.collection('users').updateOne({_id: new ObjectID (id)},{$set: req.body})
     res.json('user updated')
})

app.delete('/user/:userId', async(req,res) => {
    const id = req.params.userId
    const x = await db.collection('users').deleteOne({_id: new ObjectID (id)})
    res.json('user deleted')
})


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server is running on port ${port}...`))






// working on different requests on the front end via a button, focus on delete and post, (put/edit . after.)








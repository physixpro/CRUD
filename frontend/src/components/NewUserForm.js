import React, { useState } from "react";
import axios from "axios";

const NewUserForm = () => {
  // the reason there is an empty string is because on page reload , thats what will be occupying the input. "nothing"
  // what you put in the usestate is the default value

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// event listener (e) listens for any change/typing in the input
const recordName = (e) => {
    // e.target.value is whatever is in the input at any given point in time.
    setName(e.target.value)
    console.log(name)
}

const recordEmail = (e) => {
 setEmail(e.target.value)
}

const recordPassword = (e) => {
    setPassword(e.target.value)
}


const registerUser = async (e) => {
    // e.preventDefault tells the browser to not refresh the page onSubmit, which is the default behaviour
    e.preventDefault()
    const newUser = {
        name: name,
        email: email,
        password: password
    }
    // "await"  is waiting for the backend to respond to us
  const res = await axios.post('http://localhost:3001/users', newUser) // the body is going to be the "newUser"
  console.log(res)

}

  return (
    <div>
      <form onSubmit={registerUser}>
        <input type="text" name="name" placeholder="name" onChange= {recordName} />
        <input type="email" name="email" placeholder="email address" onChange={recordEmail} />
        <input type="password" name="password" placeholder="password" onChange={recordPassword}/>

{/* the submit 'type' triggers the onSubmit event listener */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default NewUserForm;

// 1) create html first (form element)

//2) create inputs that make up form 

//3) create button that submits the form(button always within the form)

//4) we have to record what the user is typing into each of the inputs (useState), record what is being typed in the state.

//5) handle when the user submits the form , when user hits the submit button it executes the onSubmit listener.


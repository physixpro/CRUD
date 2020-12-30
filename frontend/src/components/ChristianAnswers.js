import React, { useState, useEffect } from "react";
import axios from "axios";

function ChristianAnswers() {

  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchPets = async () => {
      const res = await axios.get('http://localhost:3001/owner/Keagan')
      console.log(res)
      setData(res.data)
  }
  fetchPets()
  }, []);

  return(
<div>

    <ul>
        {
            data.map(todo =>(
              
                <li>
                   This {todo.breed} belongs to {todo.owner} , it is {todo.age} years old and is the color {todo.color}. It is indeed a very feral looking {todo.animal}
                    </li>
            ))
        }
    </ul>
</div>
  )
  
}

export default ChristianAnswers;

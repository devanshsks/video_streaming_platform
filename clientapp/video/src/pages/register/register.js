import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Register=() => {

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRepassword] = useState("");  

  const register= ()=> {
     if(name && email && password && (password===repassword)){
      axios.post("auth/register", {email, name, password})
      .then(res => {
        alert("Successfully registered! Please login now")
        history("/login")
      }).catch((e) => {
        alert(e.response.data);
      })
    }
     else{
      alert("invalid input")
     }
  }
  return (
    <div className="register">
      <h1>Register</h1>
      <input type="text" name="name" placeholder="Enter your Name" onChange ={(e) => setName(e.target.value)}></input>
      <input type="text" name="email" placeholder="Enter your Email" onChange ={(e) => setEmail(e.target.value)}></input>
      <input type="password" name="password" placeholder="Enter your Password" onChange ={(e) => setPassword(e.target.value)}></input>
      <input type="password" name="reEnterPassword" placeholder="Re-Enter your Password" onChange ={(e) => setRepassword(e.target.value)}></input>
      <div className="button" onClick={register}>Register</div>
      <div>or</div> 
      <div className="button" onClick={() => history("/login")}>Login</div>
    </div>
  )
}

export default Register
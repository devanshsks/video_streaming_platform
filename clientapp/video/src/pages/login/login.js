import React, { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../authContext/AuthContext"
import "./login.css"
import { login } from "../authContext/apicalls"
import { useNavigate } from "react-router-dom"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useNavigate();

  const triggerlogin = (e) => {
    e.preventDefault();
    if(email === "" || password === ""){
      alert("Please fill all the details");
      return;
    }
    login({email,password}, dispatch);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Enter your Email" onChange ={(e) => setEmail(e.target.value)}></input>
      <input type="password" name="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}></input>
      <div className="button" onClick={triggerlogin}>Login</div>
      <div>or</div> 
      <div className="button" onClick={() => history("/register")}>Register</div>
    </div>
  )
}

export default Login
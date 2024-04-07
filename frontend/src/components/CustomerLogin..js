import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CustomerLogin.css';  // Import the separate CSS file
import  axios  from "axios";

function CustomerLogin({usersetter}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails,SetUserDetails] = useState({});

    const nav = useNavigate();

   async function handleLogin() {
      const resp = await axios.post("http://localhost:5000/api/login",{username,password}); 
      if(!resp.data.found)
      {
        alert("User Not Found,please check username or password");
      }
      else
      {
      
        alert("Login successfull");
        SetUserDetails(resp.data.user);
        usersetter(resp.data.user);
        console.log(resp.data.user);
        nav('/products');
      } 
    }

    

    return (
        <div className="loginContainer">
            <h1>Customer Login</h1>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username"
                className="inputField"
            />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                className="inputField"
            />
            <button onClick={handleLogin} className="loginButton">Login</button>
            <h3>Dont have account?</h3>
            <button onClick={()=>{nav('/signup')}} className="loginButton">Sign Up</button>
        </div>
    );
}

export default CustomerLogin;

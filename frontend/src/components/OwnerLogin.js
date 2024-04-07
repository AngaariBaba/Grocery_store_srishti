import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './OwnerLogin.css';  // Import the separate CSS file

function OwnerLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    async function handleLogin() {
        try {
            const resp = await axios.post("http://localhost:5000/api/login", { username, password });
            if (username=="srashti" && password=="1234") {
                nav('/enterproducts');
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="loginContainer">
            <h1>Owner Login</h1>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter Owner ID"
                className="inputField"
            />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter Owner password"
                className="inputField"
            />
            <button onClick={handleLogin} className="loginButton">Login</button>
        </div>
    );
}

export default OwnerLogin;

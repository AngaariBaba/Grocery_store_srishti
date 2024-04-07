import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";

function OwnerLogin()
{

    const [username,setuser]  = useState('');
    const [password,Setpassword]  = useState('');
    const nav = useNavigate();
    
    async function HandleLogin()
    {
        const resp = await axios.post("http://localhost:5000/api/login",{username,password});
        if(resp.data.ok=="yes")
        {
               
                nav('/enterproducts');
        }
        else
        {
            console.log("Failed");
        }
    }
    
    return(<>
    <h1>Owner Login</h1>
    <input type="text" onChange={(e)=>{setuser(e.target.value)}} placeholder="Enter Owner ID"/>
    <input type="password" onChange={(e)=>{Setpassword(e.target.value)}} placeholder="Enter Owner password"/>
    <button onClick={HandleLogin}>login</button>
    
    </>);
    
}


export default OwnerLogin;
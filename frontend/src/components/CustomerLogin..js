import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerLogin()
{

    const [username,Setusername] = useState('');
    const [password,Setpassword] = useState('');
    const nav = useNavigate();

    function HandleLogin()
    {
        if(username=="naman" && password=="1234")
        {
            nav('/products');

        }
        else
        {
            alert("Login fail");
        }
    }

    return(<>
    <h1>Customer Login</h1>

    <input type="text" onChange={(e)=>{Setusername(e.target.value)}} placeholder="Enter username"/>
    <input type="password" onChange={(e)=>{Setpassword(e.target.value)}} placeholder="Enter password"/>
    <button onClick={HandleLogin}>login</button>
    
    </>);
    
}


export default CustomerLogin;
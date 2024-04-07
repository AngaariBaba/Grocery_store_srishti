import React from "react";
import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
    return (
        <div className="container">
            <h1 className="title">Welcome to Our Shop,<br/>You Are?</h1>
            <div className="buttonContainer">
                <Link to='/ownerlogin' className="button">Owner</Link>
                <Link to='/customerlogin' className="button">Customer</Link>
            </div>
        </div>
    );
}

export default Welcome;

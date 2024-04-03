import React from "react";
import {Link} from 'react-router-dom';

function Welcome()
{
    return(<>
    <h1>Welcome to Our Shop,<br/>You Are?</h1>
   <Link to='/ownerlogin'><button>Owner</button></Link>
   <Link to='/customerlogin'> <button>Customer</button></Link>
    </>);
}

export default Welcome;
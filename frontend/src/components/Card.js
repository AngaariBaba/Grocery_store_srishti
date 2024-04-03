import React from "react";
import './products.css';

function Card({item,link,cost})
{
    return(<>
    
    <div className="card">
        <h1>{item}</h1>
        <img src={link} height='200px' width='200px'/>      
        <h3>{cost}</h3>
        <button>Add to card</button>
      </div>
    </>);
}
export default Card;
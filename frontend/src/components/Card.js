import React, { useState } from "react";
import './products.css';

function Card({cart,setCart,item,link,price,category,id})
{

  const [color,setcolor] = useState(true);

    return(<>
  
    <div className="card">
        <h1>{item}</h1>
        <img  src={link}/>      
        <h3>{price} Rs /-</h3>
        <h3 >{category}</h3>
       {
       color?
       <button  onClick={()=>{setcolor(false); setCart(item,price,id);}}>Add to cart</button>
       : 
       <button style={{backgroundColor:"red"}} onClick={()=>{setcolor(true)}}>Remove from cart</button>
       }
      </div>
    </>);
}
export default Card;
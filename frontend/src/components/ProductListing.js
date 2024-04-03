import React from "react";
import './products.css';
import Card from "./Card";

function Products()
{


  const Samaan = [
                  {
                    item:"Arhar Daal",
                    link:"https://m.media-amazon.com/images/I/41KL4K4YHXL.jpg",
                    price:"50"
                  },
                  {
                    item:"Chole",
                    link:"https://m.media-amazon.com/images/I/619Uw840ucL._AC_UL320_.jpg",
                    price:"60"
                  },

                  {
                    item:"Milk",
                    link:"https://m.media-amazon.com/images/I/71qhf77htmL._AC_UL320_.jpg",
                    price:"30"
                  }

                  ]

    
    return(<>
    <h1>Welcome to The Srashti Shop</h1>
    <div className="all">

      
      {Samaan.map((ele)=>(<>
      <Card item={ele.item} link={ele.link} price={ele.price} />
      </>))}
      
    </div>
    </>);
}

export default Products;
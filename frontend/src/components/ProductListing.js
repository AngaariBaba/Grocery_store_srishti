import React, { useEffect, useState } from "react";
import './products.css';
import Card from "./Card";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';




function Products({InsertIntoOrders,user,idsetter})
{

  const [Samaan,setSaman] = useState([{}]);
  const [Cart,InsertToCart] = useState([{}]);
  const [TotalCost,AddCost] = useState(0);
  

  const navigate = useNavigate();

    if(user===undefined)
    {
        navigate('/customerlogin');
    }

  function InsertIntoCart(item,cost,id)
  {
    InsertToCart([...Cart,{id:id,pname:item,price:cost,quantity:1}]);
    AddCost(TotalCost+cost);
    alert(TotalCost);
  }

  useEffect(()=>{
    console.log(Cart);
  },[Cart]);


   useEffect(()=>{
    async function GetProducts()
   {
     const res = await axios.get('http://localhost:5000/api/products');
     console.log(res.data);
     setSaman(res.data);
   }
   GetProducts();
   } ,[]);


   function HandlePayment() {
    const options = {
        amount: TotalCost * 100,  // Amount in paise
        currency: 'INR',
    };

    axios.post('http://localhost:5000/api/create-order', options)
        .then(response => {
            const { amount, id: order_id, currency } = response.data;

            const paymentOptions = {
                key: 'rzp_test_A51z9AKTI3SXov',  // Replace with your Test API Key
                amount: amount.toString(),
                currency: currency,
                name: 'The Srashti Shop',
                description: 'Test Payment',
                image: 'https://example.com/your_logo.png',  // Replace with your logo URL
                order_id: order_id,
                handler: function (response) {
                    idsetter(order_id);
                    const paymentId = response.razorpay_payment_id;
                    VerifyPayment(paymentId); // Implement this function
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp = new window.Razorpay(paymentOptions);
            rzp.open();
        })
        .catch(error => {
            console.log('Error creating Razorpay order:', error);
        });
}


function VerifyPayment(paymentId) {
    axios.post('http://localhost:5000/api/verify-payment', { paymentId })
    .then(response => {
        if (response.data.success) {
            alert('Payment successful!');
            // Clear the cart and update the database here
            InsertIntoOrders(Cart);
            InsertToCart([]);
            AddCost(0);
          navigate('/summery');

        } else {
            alert('Payment failed!');
        }
    })
    .catch(error => {
        console.log('Error verifying payment:', error);
    });
}
    
    return(<>
    <h1>Welcome to The Srashti Shop</h1>
    <h1>Popular Items</h1>
    <div className="all">
        
    
      {Samaan.map((ele)=>(<>
      <Card  id = {ele.id} setCart={InsertIntoCart} item={ele.name} link={ele.image} price={ele.price} category={ele.category}/>
      </>))}
    </div>

    
    <h1>Groceries Section</h1>
    <div className="all">
    
      {Samaan.filter((i)=>{

    return i.category=="groceries"

      }).map((ele)=>(<>
      <Card  id = {ele.id} setCart={InsertIntoCart} item={ele.name} link={ele.image} price={ele.price} category={ele.category}/>
      </>))}
    </div>


    <h1>Cosmetics Section</h1>
    <div className="all">
    
      {Samaan.filter((i)=>{

    return i.category=="cosmetics"

      }).map((ele)=>(<>
      <Card  id = {ele.id} setCart={InsertIntoCart} item={ele.name} link={ele.image} price={ele.price} category={ele.category}/>
      </>))}
    </div>

    <button onClick={HandlePayment}>
      BUY
    </button>
    </>);
}

export default Products;
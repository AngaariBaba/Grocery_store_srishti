import React, { useState } from "react";
import axios from 'axios';

const ProductForm = ()=>{

    const [FormData,SetFormData] = useState({}); 
   


   async function HandleSubmit()
    {
        console.log(FormData);
       const resp = await axios.post('http://localhost:5000/api/products',FormData);
       console.log(resp.data);
    }

    return ( // {productName:"milk"} , {ProductName:"Spice"}
    <>
    <input type="text" onChange={(e)=>{
        SetFormData({...FormData,productName:e.target.value});
    }} placeholder="Enter Product Name" name='productName'/>

    <input type="number" onChange={(e)=>{
        SetFormData({...FormData,price:e.target.value});
    }} placeholder="Price" name="price"/>

    <input type="number" onChange={(e)=>{
        SetFormData({...FormData,quantity:e.target.value});
    }} placeholder="quantity" name="quantity"/>


    <input type="text" onChange={(e)=>{
        SetFormData({...FormData,category:e.target.value});
    }} placeholder="category" name="category"/>

    
<input type="text" onChange={(e)=>{
        SetFormData({...FormData,image:e.target.value});
    }} placeholder="image url" name="image"/>

    <button onClick={HandleSubmit}>Add product</button>
    </>);

}


export default ProductForm;
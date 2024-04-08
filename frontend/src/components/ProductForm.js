import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './ProductForm.css';  // Import the separate CSS file

const ProductForm = ({user}) => {
    const [formData, setFormData] = useState({}); 
    const nav = useNavigate();

    async function handleSubmit() {
        console.log(formData);
        const resp = await axios.post('http://localhost:5000/api/products', formData);
        console.log(resp.data);
    }

    return (
        <div className="formContainer">
            <h2>Add New Product</h2>
            <div className="inputGroup">
                <label htmlFor="productName">Product Name:</label>
                <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    placeholder="Enter Product Name" 
                    name='productName'
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="price">Price:</label>
                <input 
                    type="number" 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Price" 
                    name="price"
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                    type="number" 
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="Quantity" 
                    name="quantity"
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="category">Category:</label>
                <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Category" 
                    name="category"
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="image">Image URL:</label>
                <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Image URL" 
                    name="image"
                    className="inputField"
                />
            </div>

            <button onClick={()=>{alert("Products added");handleSubmit()}} className="submitButton">Add Product</button>
            <button onClick={()=>{nav('/vieworders')}} className="submitButton">View Orders</button>
        </div>
    );
}

export default ProductForm;

import React, { useEffect, useState } from 'react';
import './OrderSummaryReceipt.css';
import { castToError } from 'openai/core.mjs';
import {useNavigate} from 'react-router-dom';
import NotAllowed from './NotAllowed';


const OrderSummaryReceipt = ({ user,products }) => {
    const [cname,setname] = useState("naman");
    const [caddress,setaddress] = useState("mathura");

  const customer = {
    name: cname,
    address: caddress,
  };

  useEffect(()=>{
    console.log("into summery user = ",user[0]);
    console.log("into summery user = ",user[0].name);
    if(user!=undefined)
    {
    setname(user[0].name);
    setaddress(user[0].address);
    }
    
  },[user])
  const nav = useNavigate();

 const a = products;

  if(a === undefined)
  {
    return(<NotAllowed/>);
  }

  const filteredProducts = products.filter(item => Object.keys(item).length > 0);
  
  const subtotal = filteredProducts.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0);
  console.log("subtotal begin calculated is ",subtotal);
  const taxRate = 0.1; // 10%
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;
  const contactNumber = '123-456-7890'; // Dummy contact number

  return (
       
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <div className="customer-details">
        <strong>Customer Name:</strong> {customer.name}
      </div>
      <div className="customer-details">
        <strong>Customer Address:</strong> {customer.address}
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.pname}</td>
              <td>{item.quantity}</td>
              <td>Rs{Number(item.price).toFixed(2)}</td>
              <td>Rs{(Number(item.quantity) * Number(item.price)).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="total-label">Subtotal:</td>
            <td className="total-amount">Rs{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4" className="total-label">Tax ({(taxRate * 100).toFixed(0)}%):</td>
            <td className="total-amount">Rs{taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4" className="total-label">Grand Total:</td>
            <td className="total-amount">Rs{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="contact-info">
        <p>Contact our admin for more details about your order:</p>
        <strong>Contact Number:</strong> {contactNumber}
      </div>
    </div>
       
  );
};

export default OrderSummaryReceipt;

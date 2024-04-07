import React, { useEffect } from 'react';
import Welcome from './components/Welcome';
import OwnerLogin from './components/OwnerLogin';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CustomerLogin from './components/CustomerLogin.';
import Products from './components/ProductListing';
import ProductForm from './components/ProductForm';
import OrderSummaryReceipt from './components/Receipt';
import { useState } from 'react';
import NotAllowed from './components/NotAllowed';
import SignUpForm from './components/SignUpForm';
import ViewOrders from './components/ViewOrders';


function App() {

  const [Orders,SetOrders] = useState();
  const [userdata,setuserdata] = useState();
  const [orderid,setorderid] = useState('');

  function InsertIntoOrders(orders)
  {
    SetOrders(orders);
  }

  function SetUser(user)
  {
    setuserdata(user);
  }

  function SetId(id)
  {
    setorderid(id);
  }

  useEffect(()=>{
    console.log("in app.js ,",userdata);
  },[userdata]);

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
    <Route path='/notallowed' element={<NotAllowed/>}/>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/vieworders' element={<ViewOrders/>}/>
    <Route path='/ownerlogin' element={<OwnerLogin/>}/>
    <Route path='/signup' element={<SignUpForm/>}/>
    <Route path='/customerlogin' element={<CustomerLogin usersetter={SetUser}/>}/>
    <Route path='/products'  element={<Products user={userdata} idsetter={SetId} InsertIntoOrders={InsertIntoOrders}/>}/>
    <Route path='/enterproducts' user={userdata} element={<ProductForm/>}/>
    <Route path='/summery' element={<OrderSummaryReceipt id={orderid} user={userdata} products={Orders}/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

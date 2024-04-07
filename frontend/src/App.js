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


function App() {

  const [Orders,SetOrders] = useState();
  const [userdata,setuserdata] = useState();

  function InsertIntoOrders(orders)
  {
    SetOrders(orders);
  }

  function SetUser(user)
  {
    setuserdata(user);

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
    <Route path='/ownerlogin' element={<OwnerLogin/>}/>
    <Route path='/signup' element={<SignUpForm/>}/>
    <Route path='/customerlogin' element={<CustomerLogin usersetter={SetUser}/>}/>
    <Route path='/products'  element={<Products user={userdata} InsertIntoOrders={InsertIntoOrders}/>}/>
    <Route path='/enterproducts' element={<ProductForm/>}/>
    <Route path='/summery' element={<OrderSummaryReceipt user={userdata} products={Orders}/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import Welcome from './components/Welcome';
import OwnerLogin from './components/OwnerLogin';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CustomerLogin from './components/CustomerLogin.';
import Products from './components/ProductListing';
import ProductForm from './components/ProductForm';
import OrderSummaryReceipt from './components/Receipt';
import { useState } from 'react';

function App() {

  const [Orders,SetOrders] = useState();

  function InsertIntoOrders(orders)
  {
    console.log("recieved in app.js ",orders);
    SetOrders(orders);
  }

  return (
    <div className="App">
    
    
    
     <BrowserRouter>
     <Routes>

    <Route path='/' element={<Welcome/>}/>
    <Route path='/ownerlogin' element={<OwnerLogin/>}/>
    <Route path='/customerlogin' element={<CustomerLogin/>}/>
    <Route path='/products'  element={<Products InsertIntoOrders={InsertIntoOrders}/>}/>
    <Route path='/enterproducts' element={<ProductForm/>}/>
    <Route path='/summery' element={<OrderSummaryReceipt products={Orders}/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

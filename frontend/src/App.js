import React from 'react';
import Welcome from './components/Welcome';
import OwnerLogin from './components/OwnerLogin';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CustomerLogin from './components/CustomerLogin.';
import Products from './components/ProductListing';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/ownerlogin' element={<OwnerLogin/>}/>
    <Route path='/customerlogin' element={<CustomerLogin/>}/>
    <Route path='/products' element={<Products/>}/>
    
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

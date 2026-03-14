import axios from 'axios'
import { useState, useEffect } from 'react'
import HomePage from './HomePage'
import{ Routes , Route } from 'react-router-dom'
import './App.css'
import  CheckoutPage  from './CheckoutPage'
import OrdersPage from './OrdersPage'
function App() {
 const[cart, setCart] = useState([]) ;

 useEffect(()=>{
  axios.get('/api/cart-items?expand=product')
.then((response)=> {
  setCart(response.data);
})

 },[])
 
  return (
    <>
    <Routes>
       <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
     
     </Routes>
    </>
  )
}

export default App

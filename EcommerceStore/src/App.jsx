import { useState } from 'react'
import HomePage from './HomePage'
import{ Routes , Route } from 'react-router-dom'
import './App.css'
import  CheckoutPage  from './CheckoutPage'
import OrdersPage from './OrdersPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
     
     </Routes>
    </>
  )
}

export default App

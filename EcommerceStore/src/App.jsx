import { useState } from 'react'
import HomePage from './HomePage'
import{ Routes , Route } from 'react-router-dom'
import './App.css'
import  CheckoutPage  from './CheckoutPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route index path='/' element={<HomePage />} />
       <Route path='/CheckoutPage' element={<CheckoutPage />} />

     
     </Routes>
    </>
  )
}

export default App

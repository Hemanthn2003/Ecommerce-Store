import axios from 'axios';
import { useState, useEffect } from 'react';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CheckoutPage from './CheckoutPage';
import OrdersPage from './OrdersPage';
import TrackingPage from './TrackingPage';


function App() {

  const [cart, setCart] = useState([]);

  // ✅ create reusable function
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  // ✅ initial load
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={<HomePage cart={cart} loadCart={loadCart} />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />

        <Route
          path="/orders"
          element={<OrdersPage cart={cart} loadCart={loadCart}/>}
        />

         <Route
            path="/tracking/:orderId"
            element={<TrackingPage cart={cart} />}
         />
      </Routes>
    </>
  );
}

export default App;
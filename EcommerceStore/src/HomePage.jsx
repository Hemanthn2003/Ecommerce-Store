import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { ProductsGrid } from './ProductGrid';
import './HomePage.css';

export default function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    document.title = "Ecommerce Project";

    const getProducts = async () => {
      const response = await axios.get('https://ecommerce-store-881d.onrender.com/api/products');
      setProducts(response.data);
    };

    getProducts();
  }, []);

  // 🔥 FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header cart={cart} onSearch={setSearchText} />

      <div className="home-page">
        <ProductsGrid
          products={filteredProducts}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
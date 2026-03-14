import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import "./HomePage.css";
import Header from "./components/header";


function HomePage() {

  const[products, setProducts] = useState([])

  useEffect(()=>{
  axios.get('http://localhost:3000/api/products')
  .then((response)=>{
    setProducts(response.data);
     
     
  });

  },[])

  
  useEffect(() => {
    document.title = "Ecommerce Shop";
  }, []);

  return (
    <>
     
        <Header />
      <div className="home-page">
        <div className="products-grid">

{products.map((product)=>{
return(
      <div key={product.id} className="product-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {product.name}
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src={`/images/ratings/rating-${product.rating.stars*10}.png`}
              />
              <div className="product-rating-count link-primary">{product.rating.count}</div>
            </div>

            <div className="product-price">{(product.priceCents/100).toFixed(2)}</div>

            <div className="product-quantity-container">
              <select>
                {[1,2,3,4,5,6,7,8,9,10].map((num)=>(
                  <option key={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="/images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
)
})}
        </div>
      </div>
    </>
  );
}

export default HomePage;
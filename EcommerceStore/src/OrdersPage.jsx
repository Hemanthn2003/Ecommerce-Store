import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './OrdersPage.css';
import Header from './components/Header';
import dayjs from 'dayjs';
import { formatMoney } from "../utils/money";


const OrdersPage = ({ loadCart, cart }) => {

  const [orders, setOrders] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);
  useEffect(() => {
    document.title = "Orders";

    axios.get('/api/orders?expand=products')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
      });

  }, []);

const addToCart = async (productId) => {
  try {
    await axios.post('/api/cart-items', {
      productId,
      quantity: 1
    });

    if (loadCart) {
      await loadCart();
    }

    // ✅ show message only for this product
    setAddedProductId(productId);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);

  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.length === 0 && (
            <div>No orders found</div>
          )}

          {orders.map((order) => {

            const totalCents = (order.products || []).reduce((total, item) => {
              return total + item.product.priceCents * item.quantity;
            }, 0);

            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">

                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {dayjs(order.createdAt).format('MMMM D')}
                      </div>
                    </div>

                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(totalCents)}</div>
                    </div>

                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">

                  {(order.products || []).map((item) => {
                    return (
                      <React.Fragment key={item.productId}>

                        <div className="product-image-container">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </div>

                        <div className="product-details">

                          <div className="product-name">
                            {item.product.name}
                          </div>

                          <div className="product-delivery-date">
                            Arriving on: {
                              dayjs(order.createdAt)
                                .add(item.deliveryDays || 5, 'day')
                                .format('MMMM D')
                            }
                          </div>

                          <div className="product-quantity">
                            Quantity: {item.quantity}
                          </div>
                           {addedProductId === item.product.id && (
                           
                           <div className="added-to-cart-message">
                                ✔ Added to Cart
                              </div>
                            )}
                          <button
                            className="buy-again-button button-primary"
                            onClick={() => addToCart(item.product.id)}
                          >
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                              alt="buy again"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>

                        </div>

                        <div className="product-actions">
                          <Link to={`/tracking/${order.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>

                      </React.Fragment>
                    );
                  })}

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default OrdersPage;
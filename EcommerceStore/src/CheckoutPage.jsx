import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./checkout.css";
import "./checkout-header.css";
import { formatMoney } from '../utils/money';
import logo from "./logo-white1.png";
import mobileLogo from "./mobile-logo-white1.png";
function CheckoutPage({ cart, loadCart }) {
const [deliveryOptions, setDeliveryOptions] = useState([]);
const [cartState, setCartState] = useState([]);
const [showPopup, setShowPopup] = useState(false);

useEffect(() => {
  setCartState(cart);
}, [cart]);

  useEffect(() => {
    axios.get('https://ecommerce-store-881d.onrender.com/api/delivery-options')
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  // ✅ update delivery option
  function updateDeliveryOption(productId, deliveryOptionId) {
    const newCart = cartState.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          deliveryOptionId
        };
      }
      return item;
    });

    setCartState(newCart);
  }
const placeOrder = async () => {
  console.log("CLICKED");

  try {
    // ✅ SAVE FULL ORDER DATA
    await axios.post('https://ecommerce-store-881d.onrender.com/api/orders', {
      createdAt: new Date(),
      estimatedDeliveryDate: dayjs().add(5, 'day').toISOString(),
      products: cartState
    });

    setCartState([]);

    if (loadCart) {
      await loadCart();
    }

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);

  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
    {showPopup && (
  <div className="order-popup">
    ✔ Order placed successfully
  </div>
)}
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={logo} alt="logo" />
              <img
                className="mobile-logo"
                src={mobileLogo}
                alt="mobile logo"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cartState.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img
              src="/images/icons/checkout-lock-icon.png"
              alt="secure checkout"
            />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <h1 className="page-title">Review your order</h1>

        <div className="checkout-grid">
          <div className="order-summary">

            {cartState.map((cartItem) => {
              return (

                <div key={cartItem.productId} className="cart-item-container">

                  <div className="delivery-date">
                    Delivery date: {
                      dayjs()
                        .add(
                          deliveryOptions.find(
                            (opt) => opt.id === cartItem.deliveryOptionId
                          )?.deliveryDays || 7,
                          'day'
                        )
                        .format('dddd, MMMM D')
                    }
                  </div>

                  <div className="cart-item-details-grid">

                    <img
                      className="product-image"
                      src={cartItem.product.image}
                      alt={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>

                      <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                      </div>

                      <div className="product-quantity">
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                      </div>
                    </div>

                    {/* ✅ DELIVERY OPTIONS */}
                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      {deliveryOptions.map((deliveryOption) => {

                        let priceString = 'Free Shipping';

                        if (deliveryOption.priceCents > 0) {
                          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                        }

                        return (
                          <label key={deliveryOption.id} className="delivery-option">

                            <input
                              type="radio"
                              name={`delivery-option-${cartItem.productId}`}
                              className="delivery-option-input"
                              checked={deliveryOption.id === cartItem.deliveryOptionId}
                              onChange={() =>
                                updateDeliveryOption(cartItem.productId, deliveryOption.id)
                              }
                            />

                            <div>
                              <div className="delivery-option-date">
                                {
                                  dayjs()
                                    .add(deliveryOption.deliveryDays, 'day')
                                    .format('dddd, MMMM D')
                                }
                              </div>

                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>

                          </label>
                        );
                      })}
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

{/* PAYMENT SUMMARY */}
<div className="payment-summary">
  <h2 className="payment-summary-title">Payment Summary</h2>

  <div className="payment-summary-row">
    <div>Items ({cartState.length})</div>
    <div className="payment-summary-money">
      {formatMoney(
        cartState.reduce((total, item) => {
          return total + item.product.priceCents * item.quantity;
        }, 0)
      )}
    </div>
  </div>

  <div className="payment-summary-row">
    <div>Shipping</div>
    <div className="payment-summary-money">
      {formatMoney(
        cartState.reduce((total, item) => {
          const deliveryOption = deliveryOptions.find(
            (opt) => opt.id === item.deliveryOptionId
          );
          return total + (deliveryOption?.priceCents || 0);
        }, 0)
      )}
    </div>
  </div>

  <div className="payment-summary-row subtotal-row">
    <div>Total before tax</div>
    <div className="payment-summary-money">
      {formatMoney(
        cartState.reduce((total, item) => {
          const deliveryOption = deliveryOptions.find(
            (opt) => opt.id === item.deliveryOptionId
          );

          return (
            total +
            item.product.priceCents * item.quantity +
            (deliveryOption?.priceCents || 0)
          );
        }, 0)
      )}
    </div>
  </div>

  <div className="payment-summary-row">
    <div>Estimated tax (10%)</div>
    <div className="payment-summary-money">
      {formatMoney(
        Math.round(
          cartState.reduce((total, item) => {
            const deliveryOption = deliveryOptions.find(
              (opt) => opt.id === item.deliveryOptionId
            );

            return (
              total +
              item.product.priceCents * item.quantity +
              (deliveryOption?.priceCents || 0)
            );
          }, 0) * 0.1
        )
      )}
    </div>
  </div>

  <div className="payment-summary-row total-row">
    <div>Order total</div>
    <div className="payment-summary-money">
      {formatMoney(
        (() => {
          const totalBeforeTax = cartState.reduce((total, item) => {
            const deliveryOption = deliveryOptions.find(
              (opt) => opt.id === item.deliveryOptionId
            );

            return (
              total +
              item.product.priceCents * item.quantity +
              (deliveryOption?.priceCents || 0)
            );
          }, 0);

          const tax = Math.round(totalBeforeTax * 0.1);

          return totalBeforeTax + tax;
        })()
      )}
    </div>
  </div>

  <button
  className="place-order-button button-primary"
  onClick={placeOrder}
>
  Place your order
</button>
</div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
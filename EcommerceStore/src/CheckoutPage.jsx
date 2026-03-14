import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./checkout.css";
import "./checkout-header.css";
import {formatMoney} from '../utils/money'


function CheckoutPage( {cart} ) {

  const [deliveryOption1, setDeliveryOption1] = useState("1");
  const [deliveryOption2, setDeliveryOption2] = useState("4");
  useEffect(() => {
    document.title = "Checkout";
  }, []);

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/images/logo.png" alt="logo" />
              <img
                className="mobile-logo"
                src="/images/mobile-logo.png"
                alt="mobile logo"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
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

            {/* PRODUCT 1 */}
          {  cart.map((cartItem)=>{
              return (

 <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date: Tuesday, June 21
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

                  <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>

                  <div className="product-quantity">
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  <label className="delivery-option">
                    <input
                      type="radio"
                      name="delivery-option-1"
                      checked={deliveryOption1 === "1"}
                      onChange={() => setDeliveryOption1("1")}
                    />
                    <div>
                      <div className="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div className="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </label>

                  <label className="delivery-option">
                    <input
                      type="radio"
                      name="delivery-option-1"
                      checked={deliveryOption1 === "2"}
                      onChange={() => setDeliveryOption1("2")}
                    />
                    <div>
                      <div className="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div className="delivery-option-price">
                        $4.99 Shipping
                      </div>
                    </div>
                  </label>

                  <label className="delivery-option">
                    <input
                      type="radio"
                      name="delivery-option-1"
                      checked={deliveryOption1 === "3"}
                      onChange={() => setDeliveryOption1("3")}
                    />
                    <div>
                      <div className="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div className="delivery-option-price">
                        $9.99 Shipping
                      </div>
                    </div>
                  </label>
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
              <div>Items (3)</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
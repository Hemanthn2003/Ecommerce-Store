import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./header.css";
import logo from "./logo-white1.png";
import mobileLogo from "./mobile-logo-white1.png";
const Header = ({ cart, onSearch }) => {

  const [searchText, setSearchText] = useState('');

  let totalQuantity = 0;

  (cart || []).forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="header">

      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src={logo} />
          <img className="mobile-logo" src={mobileLogo} />
 </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearch}
        />

        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">

        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>

      </div>
    </div>
  );
};

export default Header;
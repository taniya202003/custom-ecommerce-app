import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ size }) => {
  
  return (
    <div className="main_nav_div">
      <nav className="nav">
        <div className="nav_container">
          <h1 className="nav_logo"> Taniya</h1>
          <ul>
            <li className="nav_li">
              <Link
                to="/"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Home
              </Link>
            </li>

            <li className="nav_li">
              <Link
                to="/men"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Men
              </Link>
            </li>

            <li className="nav_li">
              <Link
                to="/women"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Women
              </Link>
            </li>

            <li className="nav_li">
              <Link
                to="/jewelery"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Jewelery
              </Link>
            </li>

            <li className="nav_li">
              <Link
                to="/electronics"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Electronics
              </Link>
            </li>

            {/* wishlist page ------------ */}
            <li className="nav_li">
              <Link
                to="/wishlist"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {/* <CiHeart className="nav_wishlist_icon"/> */}
                <img
                  className="nav_wishlist_icon"
                  src="https://img.icons8.com/?size=48&id=4yauMM-kbvJ-&format=png"
                  alt=""
                />
                Wishlist
              </Link>
            </li>

            {/* cart page ---------- */}
            <li className="nav_li">
              <Link
                to="/cart"
                style={{
                  fontFamily: "cursive",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <img
                  className="cartIcon"
                  src="https://www.freeiconspng.com/thumbs/cart-icon/cart-icon-16.png"
                  alt=""
                  height={"40px"}
                  width={"40px"}
                />
                Cart
                <div className="cart_items_num">{size}</div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

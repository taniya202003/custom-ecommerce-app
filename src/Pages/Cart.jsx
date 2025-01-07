import React, { useContext } from "react";
import { CartContext } from "../Hooks/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    clearCart,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const incBtn = (product) => {
    addToCart(product);
  };
  const decBtn = (product) => {
    decreaseQuantity(product);
  };

  return (
    <div className="cart_main">
      {cartItems.length === 0 ? (
        <div className="empty_cart">
          <img
            className="empty_cart_illustration"
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4816550-4004141.png?f=webp"
            alt=""
          />
          <div className="empty_cart_headings">
            <h3>Your cart is empty</h3>
            <p>
              Just relax, let us help you find some <br />
              first-class products
            </p>
            <button className="start_shoping_btn" onClick={() => navigate("/")}>
              Start Shoping
            </button>
          </div>
        </div>
      ) : (
        <div className="table_div">
          <table className="table">
            <thead className="table_head">
              <tr className="head_row">
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {Array.isArray(cartItems) &&
                cartItems.map((el) => (
                  <tr key={el.id} className="body_row">
                    <td>
                      <img
                        src={el.image}
                        alt="image"
                        height={"100px"}
                        width={"100px"}
                      />
                    </td>
                    <td>{el.title} </td>
                    <td> $ {el.price?.toFixed(2)}</td>
                    <td>
                      {/* inc and dec btn ----- */}
                      <div className="inc_dec_btn">
                        <button
                          type="button"
                          className="incBtn"
                          onClick={() => incBtn(el)}
                        >
                          +
                        </button>
                        <div className="quantity">{el.quantity}</div>
                        <button
                          type="button"
                          className="decBtn"
                          onClick={() => decBtn(el)}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    {/*--------- for sub total ------ */}
                    <td> {(el.quantity * el.price).toFixed(2)}</td>
                    <td>
                      {/*------- to remove item from cart -------*/}
                      <FaRegTrashAlt
                        className="trashcan"
                        onClick={() => removeFromCart(el.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* checkout button */}
          <div className="check_clear_btn">
            <button
              className="chekout_btn"
              onClick={() => navigate("/checkoutcart")}
            >
              Chekout
            </button>

            {/* clear cart btn  */}
            <button
              className="clear_cart_btn"
              onClick={() => {
                clearCart();
              }}
            >
              Clear Cart
            </button>
          </div>
          <br />

          {/*------- total price --------*/}
          <div
            className="total_price_btn"
            style={{ fontWeight: "bold", fontSize: "25px" }}
          >
            Total Price: ${totalPrice().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

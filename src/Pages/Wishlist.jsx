import React, { useContext } from "react";
import { CartContext } from "../Hooks/CartContext";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const { wishlistItems, addToCart, removeWishlistItem, clearWishlist } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handelAddProduct = (product) => {
    addToCart(product);
  };

  return (
    <div className="wishlist_main_div">
      {wishlistItems.length === 0 ? (
        <div>
          <img src="https://doukani.com/img/emptywishlist.jpg" alt="" />
          <div>
            <button className="start_shoping_btn" onClick={() => navigate("/")}>
              Start Shoping
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="wishlist_clear_btn"
            onClick={() => {
              clearWishlist();
            }}
          >
            Clear All
          </button>

          <div className="wishlist_product_grid">
            {wishlistItems.map((el) => (
              <div className="wishlist_product_card" key={el.id}>
                <h1>
                  <img
                    src={el.image}
                    alt="image"
                    height={"100px"}
                    width={"100px"}
                  />
                </h1>

                <h5>{el.title}</h5>
                <h5>${el.price}</h5>

                <button
                  className="wishlist_add_cart"
                  onClick={() => handelAddProduct(el)}
                >
                  Add to Cart
                </button>
                <button
                  className="wishlist_remove_item"
                  onClick={() => removeWishlistItem(el.id)}
                >
                  Remove Items
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

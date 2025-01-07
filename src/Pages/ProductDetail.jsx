import React, { useContext, useEffect, useState } from "react";
import { useCustomHook } from "../Hooks/useCustomHook";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Hooks/CartContext";
import { RatingStar } from "../Single_page_files/RatingStar";

export const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useCustomHook();
  const { cartItems, addToCart, decreaseQuantity } = useContext(CartContext);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filterProductId = products.filter((el) => el.id === parseInt(id));
    if (filterProductId.length > 0) {
      setData([{ ...filterProductId[0], quantity: 1 }]);
    }

    //--- params --- // if id is in numbers then you can write pasreInt or Number
    const cartItem = cartItems.find((item) => item.id === parseInt(id));
    if (cartItem) {
      setData([{ ...cartItem }]);
    }
  }, [id, products, cartItems]);

  const handelAddProduct = (el) => {
    addToCart(el);
  };

  const incBtn = (el) => {
    setData([{ ...el, quantity: 1 + el.quantity }]);
    addToCart(el);
  };

  const decBtn = (product) => {
    if (product.quantity < 1) {
      return;
    }
    decreaseQuantity(product);
    setData([{ ...product, quantity: product.quantity - 1 }]);
  };

  console.log(data, "id");

  return (
    <div style={{ background: "white" }}>
      <div className="prodDetail_grid">
        {/* mapping data  */}
        {data.map((el) => (
          <div className="prodDetail_card" key={el.id}>
            <div className="prodDetail_main">
              {/* product image  */}
              <div className="prodDetail_img">
                <img src={el.image} alt="" height={"400px"} width={"350px"} />
              </div>
              {/* product title  */}
              <div className="prodDetail_info">
                <h1>{el.title}</h1>
                <h3>$ {el.price}</h3>
                <hr />
                <h5>category: {el.category}</h5> <br />
                <h5> {el.description}</h5>
                <hr />
                {/* product star rating  */}
                <div style={{ display: "flex" }}>
                  <h4 style={{ padding: "5px" }}> {el.rating?.rate} </h4>
                  <div>
                    <h4>
                      <RatingStar rating={el.rating?.rate} />
                    </h4>
                  </div>
                </div>
                <hr />
                {/* add to cart, checkout and inc_dec btn  */}
                <div style={{ display: "flex", padding: "10px" }}>
                  {/* inc dec btn */}
                  <div className="main_inc_dec">
                    <div className="pd_inc">
                      <button
                        type="button"
                        className="pd_incBtn"
                        onClick={() => incBtn(el)}
                      >
                        +
                      </button>
                    </div>
                    <div className="pd_quantity">
                      {el?.quantity ? el.quantity : 1}
                    </div>
                    <div className="pd_dec">
                      <button
                        type="button"
                        className="pd_decBtn"
                        onClick={() => decBtn(el)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  {/* add to cart btn  */}
                  <div className="prodDetail_add_cart">
                    <button
                      className="pd_add_cart_btn"
                      onClick={() => handelAddProduct(el)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {/* checkout btn  */}
                  <div className="prodDetail_chekout_btn">
                    <button
                      className="pd_chekout_btn"
                      onClick={() => navigate("/checkoutcart")}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

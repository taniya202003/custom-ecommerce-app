import React,{useContext, useState, useEffect} from 'react'
import { useCustomHook } from '../Hooks/useCustomHook'
import { CartContext } from '../Hooks/CartContext';
import { IoMdHeartEmpty } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";

export const Men = ()=>{
const {products} = useCustomHook()
const { addToCart, addToWishlist, removeWishlistItem, wishlistItems } = useContext(CartContext); 
const [id, setId] = useState([]); //this state is used for wishlist icon

const menProducts= products.filter((product)=>product.category === "men's clothing")

const handleWishlistAdd = (product) => {
    if (id.includes(product.id)) {
      setId(id.filter((itemId) => itemId !== product.id));
      removeWishlistItem(product.id);
    } else {
      setId([...id, product.id]);
      addToWishlist(product);
    }
  };

  useEffect(() => {
    const wishlistIds = wishlistItems.map((item) => item.id);
    setId(wishlistIds);
  }, [wishlistItems]);

const handelAddProduct = (product) => {
    addToCart(product);
  };

    return(
        <div className="men-main-div">
<div className="product_grid">
    {menProducts.map((product,i)=>(
        <div className="product_card" key={i}>
<img className="product_image" src={product.image} alt="" />
<h2>{product.title}</h2>
            <h5>Price: ${product.price}</h5>
                  <h4 className="rating_star">
                    {product.rating.rate}
                    <img
                      style={{ verticalAlign: "baseline" }}
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                      alt=""
                    />
                  </h4>
                  <div>
                  {!id.includes(product.id) ? (
                    <IoMdHeartEmpty
                      className="empty_heart_icon"
                      onClick={() => handleWishlistAdd(product)}
                    />
                  ) : (
                    <TiHeartFullOutline
                      className="full_heart_icon"
                      onClick={() => handleWishlistAdd(product)}
                    />
                  )}

                  <button
                    className="add_cart_btn"
                    onClick={() => handelAddProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
        </div>
    ))}
</div>
        </div>
    )
}
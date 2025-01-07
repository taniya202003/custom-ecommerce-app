import React, { createContext, useEffect, useState } from "react";

//-------- creating and exportng context --------
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedItems = localStorage.getItem("wishlistItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // console.log(wishlistItems,'wishlistItems')

  // --------- getting data from local storage and setting in state --------
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // --------- setting data in local storage --------
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // ------------ addToCart and increse quantity function ------------
  const addToCart = (item) => {
    const findData = cartItems.find((el) => el.id === item.id);
    if (findData) {
      const itemInCart = cartItems.map((el) => {
        if (el.id === item.id) {
          el.quantity += 1;
        }
        return el;
      });
      setCartItems(itemInCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // const addToCart =(product)=>{
  // setCartItems((prevItem)=>{
  //   const updatedItems = prevItem.map((item)=>item.id === product.id ? {...item,quantity:item.quantity+1}:item)
  //   console.log(updatedItems,'updatedItems')
  //   return updatedItems;
  // })
  // }
  // console.log(cartItems);

  //-------- fuction for decreaseQuantity in item -----------
  const decreaseQuantity = (item) => {
    const findData = cartItems.find((el) => el.id === item.id);
    if (findData) {
      const itemInCart = cartItems.map((el) => {
        if (el.id === item.id && item.quantity > 1) {
          el.quantity -= 1;
        }
        return el;
      });
      setCartItems(itemInCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // ---------- function to remove item FromCart -----------
  const removeFromCart = (id) => {
    // console.log(id);
    setCartItems(cartItems.filter((el) => el.id !== id));
  };

  //-------- reduce method for total of price ------
  // const totalPrice = () => {
  //   return cartItems.reduce((total, item) => {
  //     return total + item.price * item.quantity;
  //   }, 0);
  // };
  const totalPrice = () => {
    if (!Array.isArray(cartItems)) {
      return 0; // Return 0 if cartItems is not an array
    }
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // -------- totalQuantity for CheckoutCart page ---------
  const totalQuantity = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  // ------- clearCart --------
  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (item) => {
    setWishlistItems([...wishlistItems, item]);
  };

  const removeWishlistItem = (id) => {
    // console.log(id);
    setWishlistItems(wishlistItems.filter((el) => el.id !== id));
    
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          cartItems,
          wishlistItems,
          setCartItems,
          setWishlistItems,
          addToCart,
          totalPrice,
          clearCart,
          removeFromCart,
          decreaseQuantity,
          totalQuantity,
          addToWishlist,
          removeWishlistItem,
          clearWishlist,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

import "./App.css";
import './Css_Files/Home.css';
import './Css_Files/Cart.css';
import './Css_Files/ProdDetail.css'
import './Css_Files/Nav.css'
import './Css_Files/Wishlist.css'
import './Css_Files/Checkout.css'
import './Css_Files/DropDown.css'
import './Css_Files/Pagination.css'
import './Css_Files/CategoryPages.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import Cart from "./Pages/Cart";
import { CartContext } from "./Hooks/CartContext";
import { useContext } from "react";
import { CheckoutCart } from "./Pages/CheckoutCart";
import { ProductDetail } from "./Pages/ProductDetail";
import { Home } from "./Pages/Home";
import {Wishlist} from "./Pages/Wishlist";
import { Jewelery } from "./CategoryPages/Jewelery";
import { Electronics } from "./CategoryPages/Electronics";
import {Women} from "./CategoryPages/Women";
import { Men } from "./CategoryPages/Men";

function App() {
const {cartItems}=useContext(CartContext);
  return (
    <div className="App">
      <Navbar size={cartItems.length}/>
      <ToastContainer/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/men" element={<Men/>}/>
  <Route path="/women" element={<Women/>}/>
  <Route path="/jewelery" element={<Jewelery/>}/>
  <Route path="/electronics" element={<Electronics/>}/>
  <Route path="/prodDetail/:id" element={<ProductDetail/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/wishlist" element={<Wishlist/>}/>
  <Route path="/checkoutcart" element={<CheckoutCart/>}/>

</Routes>    
    </div>
  );
}
export default App;

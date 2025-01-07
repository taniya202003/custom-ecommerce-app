import React, { useContext, useEffect, useState } from "react";
import { useCustomHook } from "../Hooks/useCustomHook";
import { CartContext } from "../Hooks/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { TiHeartFullOutline } from "react-icons/ti";

export const Home = () => {
  const { products } = useCustomHook();
  const { addToCart, addToWishlist, removeWishlistItem, wishlistItems } =
    useContext(CartContext);
  const [data, setData] = useState(products);
  const [category, setCategory] = useState([]);
  const [priceIsVisible, setPriceIsVisible] = useState(false);
  const [categoryIsVisible, setCategoryIsVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [id, setId] = useState([]); //this state is used for wishlist icon
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  console.log(id,'wishlistIds')

  // useEffect to update data when products change ------
  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    // Initialize the id state with the IDs of items already present in the wishlist
    const wishlistIds = wishlistItems.map((item) => item.id);
    setId(wishlistIds);
  }, [wishlistItems]); // Trigger whenever wishlistItems change

  //---- navigate to poduct detail page -----
  const navigate = useNavigate();

  // Sorting function --------
  const sorting = (products, sortOption, selectedCategories) => {
    let filteredProducts = [...products];
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    switch (sortOption) {
      case "lowest":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "highest":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "a to z":
        return filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filteredProducts;
    }
  };

  // Handle category filter -------
  const categoryFilter = (e) => {
    const selectedCategory = e.target.value;
    const isChecked = e.target.checked;
    let newCategories = [...category];
    if (isChecked && !newCategories.includes(selectedCategory)) {
      newCategories.push(selectedCategory);
    } else if (!isChecked) {
      newCategories = newCategories.filter((cat) => cat !== selectedCategory);
    }
    setCategory(newCategories);

    // Apply sorting with updated categories ------
    const sortedData = sorting(products, sortOption, newCategories);
    setData(sortedData);
  };

  // Toggle visibility of category and price dropdown ------
  const togglePriceVisibility = () => {
    setPriceIsVisible(!priceIsVisible);
  };
  const toggleCategoryVisibility = () => {
    setCategoryIsVisible(!categoryIsVisible);
  };

  // Handle sort change --------
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    // Apply sorting with updated sort option and categories ------
    const sortedData = sorting(products, selectedOption, category);
    setData(sortedData);
  }; 

  // wishlist function adding/removing from wishlist -------
  const handleWishlistAdd = (product) => {
    if (id.includes(product.id)) {
      setId(id.filter((itemId) => itemId !== product.id));
      removeWishlistItem(product.id);
    } else {
      setId([...id, product.id]);
      addToWishlist(product);
    }
  };

  // Add product to cart -------
  const handelAddProduct = (product) => {
    addToCart(product);
  };

  // Pagination  ---------
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecord = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);
  //Math.ceil() always rounds up a number example:- Math.ceil(4.5); output: 5
  // Array(nPages + 1) creates a new array with a length of nPages + 1.
  //.keys() returns an iterator that produces the keys (indices(means index value that satrt from 0)) of the array.
  // slice(1) is use to slice the array from index 1 and skip 0 on index

    // ------- Function to handle ellipses click in Pagination ---------
const handelEllipsesClick=(direction)=>{
if(direction === 'prev'){
  setCurrentPage(currentPage - 3)
}else{
  setCurrentPage (currentPage + 3)
}
}
let ellipsisShown = false;


  return (
    <div className="main_home_div" style={{ background: "white" }}>
      <div className="search_sort_category">
       
        {/* search filter */}
        <div className="sort_search">
          <input
            className="input"
            type="text"
            placeholder="search products"
            onChange={(e) =>
              setData(
                sorting(products, sortOption, category).filter((product) =>
                  product.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              )
            }
          />

          {/* price dropdown    */}
          <div
            className={`dropdown-check-listA ${
              priceIsVisible ? "visible" : ""
            }`}
            tabIndex={100}
          >
            <span className="anchorA" onClick={togglePriceVisibility}>
              Select Price
            </span>
            <ul
              className="itemsA"
              style={{ display: priceIsVisible ? "block" : "none" }}
            >
              <li>
                <input
                  type="radio"
                  value="a to z"
                  name="sort"
                  id="sort"
                  onChange={handleSortChange}
                  checked={sortOption === "a to z"}
                />
                a to z
              </li>
              <li>
                <input
                  type="radio"
                  value="highest"
                  name="sort"
                  id="sort"
                  onChange={handleSortChange}
                  checked={sortOption === "highest"}
                />
                high to low
              </li>
              <li>
                <input
                  type="radio"
                  value="lowest"
                  name="sort"
                  id="sort"
                  onChange={handleSortChange}
                  checked={sortOption === "lowest"}
                />
                low to high
              </li>
            </ul>
          </div>

          {/* Category dropdown */}
          <div
            id="list2"
            className={`dropdown-check-list ${
              categoryIsVisible ? "visible" : ""
            }`}
            tabIndex={100}
          >
            <span className="anchor" onClick={toggleCategoryVisibility}>
              Select Category
            </span>
            <ul className="items">
              <li>
                <input
                  type="checkbox"
                  value="men's clothing"
                  onChange={categoryFilter}
                />
                men's clothing
              </li>
              <li>
                <input
                  type="checkbox"
                  value="women's clothing"
                  onChange={categoryFilter}
                />
                women's clothing
              </li>
              <li>
                <input
                  type="checkbox"
                  value="jewelery"
                  onChange={categoryFilter}
                />
                jewelery
              </li>
              <li>
                <input
                  type="checkbox"
                  value="electronics"
                  onChange={categoryFilter}
                />
                electronics
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*  Mapping products */}
      <div className="product_grid">
        {data.length === 0
          ? "NO DATA FOUND"
          : currentRecord.map((product) => (
              <div className="product_card" key={product.id}>
                <div onClick={() => navigate(`/prodDetail/${product.id}`)}>
                  <img className="product_image" src={product.image} alt="" />
                  <br />
                  <h4>{product.title}</h4>
                  <h4>$ {product.price}</h4>
                  <h4> {product.category}</h4>
                  <h4 className="rating_star">
                    {product.rating.rate}
                    <img
                      style={{ verticalAlign: "baseline" }}
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                      alt=""
                    />
                  </h4>
                </div>
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

      {/* pagination div  */}
      <div className="pagination_main_div">
        <nav className="pagination_nav">
          <ul className="pagination_ul">
            <li className="pagination_li_item_pn">
              <button
                className="pagination_prev_btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <Link className="pagination-link" to="#">
                  Prev
                </Link>
              </button>
            </li>
              {numbers.map((p, i) => {
              if (
                (p === 1 || p === nPages || Math.abs(p - currentPage) <= 1) ||
                //Math.abs (math.abstract)is used for number so that number wont go in -minus
                // n = first page 
                //nPages = last page 
                //numbers = all pages
                (p === currentPage - 2 && currentPage >= 3) ||// before the current page 
                (p === currentPage + 2 && currentPage < nPages - 2) // after the current page 
              ) {
                return (
                  <li
                    className={`pagination_li_item ${
                      currentPage === p ? "active_pagination" : ""
                    }`}
                    key={i}
                  >
                    <Link
                      className="pagination-link"
                      to="#"
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </Link>
                  </li>
                );
              } else if (!ellipsisShown) {
                ellipsisShown = true;
                return (
                  <li
                    className="pagination_li_item"
                    key={i}
                    onClick={() =>
                      handelEllipsesClick(p < currentPage ? "prev" : "next")
                    }
                  >
                    <Link className="pagination-link" to="#">
                      ...
                    </Link>
                  </li>
                );
              }
              return null;
            })}
            <li className="pagination_li_item_pn">
              <button
                className="pagination_next_btn"
                disabled={currentPage === nPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <Link className="pagination-link" to="#">
                  Next
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

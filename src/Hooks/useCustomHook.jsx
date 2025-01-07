import { useEffect, useState } from "react";

export const useCustomHook = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductApi();
  }, []);

  const fetchProductApi = async () => {
    try {
      const result = await fetch("https://fakestoreapi.com/products");
      const response = await result.json();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(products, "products");

  return { products };
};

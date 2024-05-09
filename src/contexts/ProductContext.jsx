import { useState, useEffect, createContext } from "react";

// creamos el contexto

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, searchResults, setSearchResults }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

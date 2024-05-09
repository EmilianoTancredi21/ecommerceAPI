import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";
import { IoMdArrowForward } from "react-icons/io";
import { ProductContext } from "../contexts/ProductContext";

const FilterSidebar = () => {
  const { filterOpen, handleFilterClose } = useContext(FilterContext);
  const { products, setSearchResults } = useContext(ProductContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    setCategory("");
    setGender("");
  };

  const handleSearch = () => {
    let filteredProducts = [...products];

    if (minPrice !== "" && maxPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    if (category !== "") {
      filteredProducts = filteredProducts.filter((product) => {
        if (category === "clothing") {
          return (
            product.category === "men's clothing" ||
            product.category === "women's clothing"
          );
        } else {
          return product.category === category;
        }
      });
    }

    if (gender === "men") {
      // Si el género seleccionado es "men", filtrar solo la ropa de hombre
      filteredProducts = filteredProducts.filter(
        (product) => product.category === "men's clothing"
      );
    } else if (gender === "women") {
      // Si el género seleccionado es "women", filtrar solo la ropa de mujer
      filteredProducts = filteredProducts.filter(
        (product) => product.category === "women's clothing"
      );
    }

    if (sortBy === "low-to-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setSearchResults(filteredProducts);
    console.log("Search results:", filteredProducts);
  };

  return (
    <div
      className={`${
        filterOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Filter Products</div>
        <div
          onClick={handleFilterClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="h-[520px] lg:h-[580px] mt-10">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-[80px] px-2 py-1 mr-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
          />
          -
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-[80px] px-2 py-1 ml-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Sort by Price
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-primary"
          >
            <option value="">Select</option>
            <option value="low-to-high">Lowest to Highest</option>
            <option value="high-to-low">Highest to Lowest</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-primary"
          >
            <option value="">All</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-primary"
          >
            <option value="">All</option>
            <option value="men">Mens</option>
            <option value="women">Womens</option>
          </select>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={resetFilters} // Llama a la función resetFilters cuando se presiona el botón
          className="bg-gray-300 flex p-4 justify-center items-center text-gray-800 w-full font-medium mt-2"
        >
          Reset Filters
        </button>
        <button
          onClick={handleSearch}
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;

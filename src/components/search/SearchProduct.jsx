import React, { useState, useEffect, useRef } from "react";
import searchImg from "../../assets/search.png";
import downArrowImg from "../../assets/downarrow.png";
import useClickOutside from "../../hook/useClickOutSideSearch";
import axios from "axios";
import AuctionItem from "./AuctionItem";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [categories, setCategories] = useState([]);
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const [auctionItems, setAuctionItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { productName } = useParams();
  const [nameOfProduct, setNameOfProduct] = useState("");
  console.log(productName);
  useClickOutside(filterRef, () => setIsFilterOpen(false));
  useClickOutside(sortRef, () => setIsSortOpen(false));

  const handleClickFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleClickSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSort = (value) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      setSelectedCategory(categoryId);
      setIsFilterOpen(false);

      searchProducts(nameOfProduct, categoryId);
      //   const response = await axios.get(
      //     `https://e-auction-api.up.railway.app/v1/auction/list-client?categoryId=${categoryId}`
      //   );

      //   const auctionData = response.data.data.content;
      //   setAuctionItems(auctionData);
    } catch (error) {
      console.error("Error fetching auction items:", error);
    }
  };

  const handleClickFilterCategory = async () => {
    try {
      setIsFilterOpen(!isFilterOpen);
      // Call the API to fetch categories
      const response = await axios.get(
        "https://e-auction-api.up.railway.app/v1/category/auto-complete?kind=1"
      );
      const categoryData = response.data.data.content;
      console.log("Hello", categoryData);
      // Update state with fetched categories
      setCategories(categoryData);
      setIsFilterOpen(!isFilterOpen);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSortClick = async () => {
    try {
      const response = await axios.get(
        `https://e-auction-api.up.railway.app/v1/auction/list?productName=&sortBy=${sortBy}`
      );
      // Handle the response, update your component state, etc.
      console.log("Sorted data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show an error message, etc.
    }
  };

  //   const searchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://e-auction-api.up.railway.app/v1/auction/list?productName=${nameOfProduct}`
  //       );

  //       const auctionData = response.data.data.content;
  //       setAuctionItems(auctionData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const searchProducts = async (productName, categoryId = "", sortBy = "") => {
    try {
      const response = await axios.get(
        `https://e-auction-api.up.railway.app/v1/auction/list?productName=${productName}&categoryId=${categoryId}&sortBy=${sortBy}`
      );
      console.log(
        `https://e-auction-api.up.railway.app/v1/auction/list?productName=${productName}&categoryId=${categoryId}&sortBy=${sortBy}`
      );
      const auctionData = response.data.data.content;

      setAuctionItems(auctionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchClick = () => {
    console.log(nameOfProduct);
    console.log(selectedCategory);
    console.log(sortBy);
    navigate(`/searchproduct/${nameOfProduct}`);
    searchProducts(nameOfProduct, selectedCategory, sortBy);
  };

  const handleAllOptionClick = () => {
    setSelectedCategory(""); // Set selectedCategory to empty string
    setSortBy(""); // Set sortBy to empty string
    setIsFilterOpen(false); // Close the dropdown after selecting "All"
    // Perform the search with empty category and sort options
    searchProducts(nameOfProduct, "", "");
  };

  useEffect(() => {
    // Perform an initial search when the component mounts
    searchProducts(productName, "", "");
  }, [productName]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-4">
        <div className="w-1/3 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search"
            value={nameOfProduct}
            onChange={(e) => setNameOfProduct(e.target.value)}
            className="w-full border-none p-2  bg-[#52AB98] h-10 rounded-xl text-white font-semibold "
          />
        </div>
        <div className="ml-2 cursor-pointer bg-[#52AB98] flex justify-center items-center w-14 h-10 rounded-xl text-white font-semibold p-2">
          <img
            onClick={handleSearchClick}
            src={searchImg}
            alt=""
            className="w-6 h-6 "
          />
        </div>
        {/* Filter */}

        <div
          ref={filterRef}
          className={`cursor-pointer relative inline-block ml-2 bg-[#52AB98] w-24 h-10 rounded-xl text-white font-semibold p-2 ${
            isFilterOpen ? "open" : ""
          }`}
        >
          <div
            className="flex items-center justify-center"
            onClick={handleClickFilterCategory}
          >
            <h2 className="mr-2 text-white text-md font-semibold ">
              {selectedCategory
                ? categories[selectedCategory - 1].categoryName
                : "All"}
            </h2>
            <div className="flex justify-center items-center">
              <img src={downArrowImg} alt="" className="w-4 h-4" />
            </div>
          </div>
          {/* DropDown Filter*/}
          {isFilterOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-0.2" role="none">
                <div className="cursor-pointer text-gray-700 rounded-md hover:bg-[#52AB98] hover:text-white block px-4 py-2 text-md" onClick={handleAllOptionClick}>
                  All
                </div>
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer text-gray-700 rounded-md hover:bg-[#52AB98] hover:text-white block px-4 py-2 text-md"
                    tabIndex="-1"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.categoryName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort */}

        <div
          ref={sortRef}
          className={`cursor-pointer relative inline-block ml-2 bg-[#52AB98] w-24 h-10 rounded-xl text-white font-semibold p-2 ${
            isSortOpen ? "open" : ""
          }`}
        >
          {/* Box */}
          <div
            className="flex items-center justify-center"
            onClick={handleClickSort}
          >
            <h2 className="mr-2 text-white text-md font-semibold ">Sort</h2>
            <div className="flex justify-center items-center">
              <img src={downArrowImg} alt="" className="w-4 h-4" />
            </div>
          </div>
          {/* DropDown Sort */}
          {isSortOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-0.2" role="none">
                <div
                  onClick={() => handleSort("1")}
                  className="cursor-pointer text-gray-700 rounded-md hover:bg-[#52AB98] hover:text-white block px-4  py-2 text-md"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Price: lowest first
                </div>
                <div
                  onClick={() => handleSort("2")}
                  className="cursor-pointer text-gray-700 block rounded-md hover:bg-[#52AB98] hover:text-white px-4 py-2 text-md"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Price: highest first
                </div>
                <div
                  onClick={() => handleSort("3")}
                  className="cursor-pointer text-gray-700 block rounded-md hover:bg-[#52AB98] hover:text-white px-4 py-2 text-md"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Name: A to Z
                </div>
                <div
                  onClick={() => handleSort("4")}
                  className="cursor-pointer text-gray-700 block rounded-md hover:bg-[#52AB98] hover:text-white px-4 py-2 text-md"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Name: Z to A
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {(auctionItems?.length ?? 0) > 0 ? (
          auctionItems.map((item) => <AuctionItem key={item.id} item={item} />)
        ) : (
          <p>Do not have anything</p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;

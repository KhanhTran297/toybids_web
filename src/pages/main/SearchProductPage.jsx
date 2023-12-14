import React from "react";
import SearchProduct from "../../components/search/SearchProduct";
import { useNavigate } from "react-router-dom";


const SearchProductPage = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className="w-20 h-10 bg-[#52AB98] mt-24 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white ">
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      <SearchProduct></SearchProduct>
    </div>
  );
};

export default SearchProductPage;
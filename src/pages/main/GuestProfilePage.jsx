import React from "react";
import GuestProfile from "../../components/profile/GuestProfile";
import { useNavigate } from "react-router-dom";

const GuestProfilePage = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    history.back();
  };
  return (
    <div>
      <div className="w-20 h-10 bg-[#52AB98] mt-24 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white ">
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      <GuestProfile></GuestProfile>
    </div>
  );
};

export default GuestProfilePage;

import React from "react";
import ContentProfile from "../../components/profile/ContentProfile";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/home");
  };
  return (
    <div className="min-h-screen">
      <div className=" w-20 h-10 bg-[#52AB98] mt-24 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white ">
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      <ContentProfile></ContentProfile>
    </div>
  );
};

export default UserProfilePage;

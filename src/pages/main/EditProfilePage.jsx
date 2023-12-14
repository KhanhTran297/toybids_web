import React from "react";
import EditProfile from "../../components/profile/EditProfile";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/userprofile");
  };
  return (
    <div>
      <div className="w-20 h-10 bg-[#52AB98] mt-24 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white ">
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      <EditProfile></EditProfile>
    </div>
  );
};

export default EditProfilePage;

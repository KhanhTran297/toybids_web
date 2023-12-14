import React, { useState, useEffect } from "react";
import axios from "axios";
import userImg from "../../assets/gamer.png";
import { useNavigate } from "react-router-dom";

const ContentProfile = () => {
  // State to store user profile data
  const [userProfileData, setUserProfileData] = useState(null);
  const navigate = useNavigate();
  // Function to return a static token for testing


  // Fetch user profile data from the API
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    console.log(storedToken);
    if(storedToken){
        axios
      .get("https://e-auction-api.up.railway.app/v1/user-account/profile", {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .then((response) => {
        // Assuming the data is nested under response.data.data
        setUserProfileData(response.data.data);
        console.log("GET data successful:", response.data.data);
        // Handle the API response here if needed
      })
      .catch((error) => {
        console.error("Error GET data failed:", error);
        // Handle errors here if needed
      });
    }else{
      console.error("Token not found in localStorage");
    } 
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const handleEditProfileClick = () => {
    // Navigate to the 'editprofile' route
    navigate("/editprofile");
  };
  

  return (
    <div className=" py-6 px-44">
      {userProfileData && (
        <>
          <div className="flex">
            <img
              src={userProfileData.avatarPath || userImg}
              alt=""
              className="w-36 h-36 rounded-full"
            />
            <div className="w-28 h-10 bg-[#52AB98] mt-16 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white " onClick={handleEditProfileClick}>
              <button >Edit Profile</button>
            </div>
          </div>
          {/* Profile Info */}
          <div className="mt-4">
            <div>
              <h2 className="font-semibold text-xl">Full Name</h2>
              <div className="w-full mt-2">
                <input
                  value={userProfileData.fullName}
                  disabled={true}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white cursor-not-allowed"
                  type="text"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold text-xl">Email</h2>
              <div className="w-full mt-2">
                <input
                  value={userProfileData.email}
                  disabled={true}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-gray-400 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentProfile;

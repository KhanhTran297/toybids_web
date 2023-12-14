import React, { useState, useEffect } from "react";
import axios from "axios";
import userImg from "../../assets/gamer.png";
import { useNavigate,useParams } from "react-router-dom";

const GuestProfile = () => {
  // State to store user profile data
  const [userProfileData, setUserProfileData] = useState(null);
  const navigate = useNavigate();
  const { guestID } = useParams();
  // Function to return a static token for testing
  const staticToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2tpbmQiOjIsInVzZXJfaWQiOjY5NjA4MTkyNDI0MzQ1NjAsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsImFkZGl0aW9uYWxfaW5mbyI6ImVKd3pzelF6c0RDME5ESXhNakUyTVRVenFER3FzYkVERWlVWmlYa1pKZm1KZVFZV0JoWkdCZ1pHRHVtNWlaazVlc241dVRXNmhqVnBpVG5GcVFBQkhoS0YiLCJ1c2VyX25hbWUiOiJ0aGFuaHRvYW4wODA4MjAwMkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNzA1MDU5ODIxLCJhdXRob3JpdGllcyI6WyJST0xFX0FDQ19WIiwiUk9MRV9QUk9EVUNUX0NSRUFURSJdLCJqdGkiOiI1ZjA4NDkzNC1hZWY4LTQxMzAtYTgxNC1lODQwZDMxNDdjYWUiLCJjbGllbnRfaWQiOiJ0b3lfYmlkcyJ9.vo_GWpJ3uIyQhwY91qzhKQEdZy-SNFq0O5_vULSkwJs";

  // Fetch user profile data from the API
  useEffect(() => {
    // const storedToken = localStorage.getItem("sessionToken");
    // if(storedToken){

    // }else{
    //   console.error("Token not found in localStorage");
    // }
    
    axios
      .get(`https://e-auction-api.up.railway.app/v1/user-account/get/${guestID}`, {
        headers: {
          Authorization: "Bearer " + staticToken,
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
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  

  return (
    <div className="py-6 px-44">
      {userProfileData && (
        <>
        
          <div className="flex">
            <img
              src={userProfileData.avatarPath || userImg}
              alt=""
              className="w-36 h-36 rounded-full"
            />
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
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-gray-400 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white cursor-not-allowed"
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

export default GuestProfile;

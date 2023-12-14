import React, { useState, useEffect } from "react";
import axios from "axios";
import userImg from "../../assets/gamer.png";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const storedToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // Add other fields as needed
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    // Update the file state when the user selects a file
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "avatar");

      const response = await axios.post(
        "https://e-auction-api.up.railway.app/v1/file/upload/s3",
        formData,
        {
          headers: {
            Authorization: "Bearer " + storedToken,
          },
        }
      );

      console.log("Image uploaded successfully:", response.data.data.filePath);

      const updatedProfile = {
        ...userProfileData,
        avatarPath: response.data.data.filePath,
      };

      // Make a request to update the avatarPath in the user's profile
      const updateResponse = await axios.put(
        "https://e-auction-api.up.railway.app/v1/user-account/update-profile",
        updatedProfile,
        {
          headers: {
            Authorization: "Bearer " + storedToken,
          },
        }
      );

      console.log("Avatar path updated in user profile:", updateResponse.data);

      // You can also update the local state with the new user profile data
      setUserProfileData(updatedProfile);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, show an error message, etc.
    }
  };

  // Fetch user profile data from the API
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
        axios
      .get("https://e-auction-api.up.railway.app/v1/user-account/profile", {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .then((response) => {
        setUserProfileData(response.data.data);
        setFormData({
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          // Update other fields as needed
        });
        console.log("GET data successful:", response.data.data);
      })
      .catch((error) => {
        console.error("Error GET data failed:", error);
      });
    } else {
      console.error("Token not found in localStorage");
    }
    
  }, [storedToken]);

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    try {
        
      const response = await axios.put(
        "https://e-auction-api.up.railway.app/v1/user-account/update-profile",
        formData,
        {
          headers: {
            Authorization: "Bearer " + storedToken,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
      // You can add a success message or redirect the user after a successful update
      navigate("/userprofile"); // Redirect to the profile page, for example
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error, show an error message, etc.
    }
  };

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

            <div className="flex flex-col justify-center">
              <div className="flex h-10">
                <input
                  type="file"
                  className="p-2  h-10 mb-4 ml-4 rounded-lg font-semibold text-black"
                  onChange={handleFileChange}
                />
              </div>

              <div className=" h-10 bg-[#52AB98] mt-4 mb-12 ml-6 flex items-center justify-center rounded-lg font-semibold text-white ">
                <button onClick={handleImageUpload}>Upload Image</button>
              </div>
            </div>
          </div>
          {/* Profile Info */}
          <div className="mt-4">
            <div>
              <h2 className="font-semibold text-xl">Full Name</h2>
              <div className="w-full mt-2">
                <input
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold text-xl">Email</h2>
              <div className="w-full mt-2">
                <input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/2 h-10 bg-[#52AB98] mt-16 mb-12 ml-4 flex items-center justify-center rounded-lg font-semibold text-white " onClick={handleSubmit}>
                <button >Save Changes</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProfile;

import React from "react";
import "./UserOption.css";
import { useNavigate } from "react-router-dom";

export const UserOption = () => {
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate("/userprofile");
  };

  const handleClickCreateAuction = () => {
    navigate("/addproduct");

  const handleClickGuestProfile = (guestID) => {
    navigate(`/guestprofile/${guestID}`);

  };

  const handleLogout = () => {
    // Xóa toàn bộ token khỏi localStorage khi người dùng click Log out
    localStorage.removeItem("userToken");

    // Chuyển về trang đăng nhập (có thể thay đổi đường dẫn tùy theo cấu trúc định tuyến của bạn)
    window.location.href = "/"; // Điều hướng về trang đăng nhập
  };

  return (

    <div
      className="absolute right-0 top-14 mr-4 z-10 mt-2 w-34 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <div className="py-0.2" role="none">
        <div
          
          className="cursor-pointer text-gray-700 rounded-md hover:bg-[#52AB98] hover:text-white block px-4  py-2 text-md"
          tabIndex="-1"
          id="menu-item-0"
          onClick={handleClickProfile}
        >
          User Profile
        </div>
  <div
          
          className="cursor-pointer text-gray-700 rounded-md hover:bg-[#52AB98] hover:text-white block px-4  py-2 text-md"
          tabIndex="-1"
          id="menu-item-0"
          onClick={handleClickCreateAuction}
        >
          Create Auction
        </div>
  
        <div

          className="cursor-pointer text-gray-700 block rounded-md hover:bg-[#52AB98] hover:text-white px-4 py-2 text-md"
          tabIndex="-1"
          id="menu-item-1"
          onClick={handleLogout}
        >
          Log out
        </div>
        {/* <div

          className="cursor-pointer text-gray-700 block rounded-md hover:bg-[#52AB98] hover:text-white px-4 py-2 text-md"
          tabIndex="-1"
          id="menu-item-1"
        >
          Name: A to Z
        </div> */}
        
      </div>
    </div>

    // <div className="flex-col items-start gap-[24px] p-6 rounded-[14px] fixed top-10 right-2 ">
    //   <a className="user cursor-pointer" onClick={handleClickProfile}>
    //     Profile
    //   </a>
    //   <a className="user cursor-pointer" onClick={() => handleClickGuestProfile(6991830680698880)}>
    //     Guest Profile
    //   </a>
    //   <a className="user" href="#" onClick={handleLogout}>
    //     Log out
    //   </a>
    // </div>
  );
};

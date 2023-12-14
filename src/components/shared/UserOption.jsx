import React from "react";
import "./UserOption.css";
import { useNavigate } from 'react-router-dom';

export const UserOption = () => {
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate('/userprofile');
  };

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
    <div className="flex-col items-start gap-[24px] p-6 rounded-[14px] fixed top-10 right-2 ">
      <a className="user cursor-pointer" onClick={handleClickProfile}>
        Profile
      </a>
      <a className="user cursor-pointer" onClick={() => handleClickGuestProfile(6991830680698880)}>
        Guest Profile
      </a>
      <a className="user" href="#" onClick={handleLogout}>
        Log out
      </a>
    </div>
  );
};


import React, { useState } from "react";
import { ILocalSearch } from "../svg/search";
import Avt from "./Avt";
import { ILocalNotification } from "../svg/notification";
import useClickOutSide from "../../hook/useClickOutside";
import { UserOption } from "./UserOption";
import Logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const location = useLocation();
  const navigate = useNavigate();
  const { productName: currentProductName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Navigate to the search product page with the entered search term
    navigate(`/searchproduct/${searchTerm}`);
  };

  return (
    <div
      className="w-full h-[60px] flex items-center flex-row px-12 bg-[#2B6777]  gap-12  fixed top-0 z-50"
      ref={nodeRef}
    >
      <div className="w-[87px] h-[48.578px]">
        <img src={Logo} alt="" className="w-[87px] h-[48.578px]" />
      </div>

      <div className="flex flex-row items-center h-full ">
        <Link to="/home">
          <button className="flex justify-center px-6 text-white hover:bg-[#1f5361] h-full items-center text-lg">
            Home
          </button>
        </Link>
        <button className="flex justify-center px-6 text-white hover:bg-[#1f5361] h-full items-center text-lg">
          About Us
        </button>
      </div>

      <div className="fixed flex flex-row items-center gap-6 right-12">
        {!location.pathname.includes("/searchproduct") && (
          <form onSubmit={handleSearchSubmit}>
            <div className="w-[400px] flex  flex-row gap-2 rounded-[8px] items-center bg-[#52AB98] h-10 px-2">
              <ILocalSearch fill="#ffff" />
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search"
                className="border-none outline-none bg-[#52AB98] text-[#ffff] "
              />
            </div>
          </form>
        )}

        <ILocalNotification fill="#ffff" />

        <button onClick={() => setShow(!show)}>
          <Avt />
        </button>
      </div>

      {show ? (
        <div>
          <UserOption />
        </div>
      ) : null}
    </div>
  );
};

export default Header;

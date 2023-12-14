import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const GuardRoute = ({ children }) => {
  const CheckToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (CheckToken == undefined) {
      navigate("/");
    }
  }, []);
  return <div className=" h-full">{children}</div>;
};

GuardRoute.propTypes = {};

export default GuardRoute;

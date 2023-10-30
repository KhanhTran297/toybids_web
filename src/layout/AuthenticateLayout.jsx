import { Outlet } from "react-router-dom";

const AuthenticateLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthenticateLayout;

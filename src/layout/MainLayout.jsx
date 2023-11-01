import { Outlet } from "react-router-dom";
import Header from "../components/shared/header";

const MainLayout = () => {
  return (
    <div className="w-full h-full ">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;

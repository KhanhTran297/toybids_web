import { Outlet } from "react-router-dom";
import Header from "../components/shared/header";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full gap-6 ">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;

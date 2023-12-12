import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (

    <div className="flex flex-col w-full h-full gap-6 ">

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

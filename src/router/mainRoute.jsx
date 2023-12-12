import MainLayout from "../layout/MainLayout";
import AboutUsPage from "../pages/main/AboutUsPage";
import AddProductPage from "../pages/main/AddProductPage";
import HomePage from "../pages/main/HomePage";
import ProductDetailPage from "../pages/main/ProductDetailPage";
import TransactionHistoryPage from "../pages/main/TransactionHistoryPage";

// Xem cấu trúc route ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "productdetail",
        element: <ProductDetailPage />,
      },
      {
        path: "addproduct",
        element: <AddProductPage />,
      },
      {
        path: "transactionhistory",
        element: <TransactionHistoryPage />,
      },
      {
        path: "aboutus",
        element: <AboutUsPage />,
      },
    ],
  };

  routes.push(route);
}

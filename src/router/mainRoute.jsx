import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/main/HomePage";
import ProductDetailPage from "../pages/main/ProductDetailPage";

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
    ],
  };

  routes.push(route);
}

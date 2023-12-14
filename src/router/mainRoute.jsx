import MainLayout from "../layout/MainLayout";
import AboutUsPage from "../pages/main/AboutUsPage";
import AddProductPage from "../pages/main/AddProductPage";
import TransactionHistoryPage from "../pages/main/TransactionHistoryPage";
import HomePage from "../pages/main/HomePage";
import ProductDetailPage from "../pages/main/ProductDetailPage";
import CheckOutPage from "../pages/main/CheckoutPage";
import GuardRoute from "./GuardRoute";

// Xem cấu trúc route ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: (
          <GuardRoute>
            <HomePage />
          </GuardRoute>
        ),
      },
      {
        path: "productdetail",
        element: (
          <GuardRoute>
            <ProductDetailPage />
          </GuardRoute>
        ),
      },
      {
        path: "addproduct",
        element: (
          <GuardRoute>
            <AddProductPage />
          </GuardRoute>
        ),
      },
      {
        path: "transactionhistory",
        element: (
          <GuardRoute>
            <TransactionHistoryPage />
          </GuardRoute>
        ),
      },
      {
        path: "aboutus",
        element: (
          <GuardRoute>
            <AboutUsPage />
          </GuardRoute>
        ),
      },
      {
        path: "addproduct",
        element: (
          <GuardRoute>
            <AddProductPage />
          </GuardRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <GuardRoute>
            <CheckOutPage />
          </GuardRoute>
        ),
      },
    ],
  };

  routes.push(route);
}

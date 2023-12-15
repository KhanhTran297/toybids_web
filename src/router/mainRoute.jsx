import MainLayout from "../layout/MainLayout";
import AboutUsPage from "../pages/main/AboutUsPage";
import AddProductPage from "../pages/main/AddProductPage";
import TransactionHistoryPage from "../pages/main/TransactionHistoryPage";
import HomePage from "../pages/main/HomePage";
import ProductDetailPage from "../pages/main/ProductDetailPage";
import UserProfilePage from "../pages/main/UserProfilePage";
import EditProfilePage from "../pages/main/EditProfilePage";
import GuestProfilePage from "../pages/main/GuestProfilePage";
import SearchProductPage from "../pages/main/SearchProductPage";
import CheckOutPage from "../pages/main/CheckoutPage";

import GuardRoute from "./GuardRoute";
import HistoryPage from "../pages/main/HistoryPage";

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
        path: "productdetail/:productId",
        element: (
          <GuardRoute>
            <ProductDetailPage />
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
        path: "userprofile",
        element: (
          <GuardRoute>
            <UserProfilePage />
          </GuardRoute>
        ),
      },

      {
        path: "editprofile",
        element: (
          <GuardRoute>
            <EditProfilePage />
          </GuardRoute>
        ),
      },
      {
        path: "history",
        element: (
          <GuardRoute>
            <HistoryPage />
          </GuardRoute>
        ),
      },
      {
        path: "guestprofile/:guestID",
        element: (
          <GuardRoute>
            <GuestProfilePage />
          </GuardRoute>
        ),
      },
      {
        path: "searchproduct/:productName",
        element: (
          <GuardRoute>
            <SearchProductPage />
          </GuardRoute>
        ),
      },
      {
        path: "checkout/:auctionId",
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

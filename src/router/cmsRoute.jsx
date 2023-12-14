import AccountManagement from "../components/admin/AccountManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import ProductsManagement from "../components/admin/ProductsManagement";
import CmsLayout from "../layout/CmsLayout";
import CmsPage from "../pages/admin/CmsPage";
import GuardRoute from "./GuardRoute";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <CmsLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        path: "admin/",
        element: <CmsPage />,
        children: [
          {
            path: "account",
            element: (
              <GuardRoute>
                <AccountManagement />
              </GuardRoute>
            ),
          },
          {
            path: "product",
            element: (
              <GuardRoute>
                <ProductsManagement />
              </GuardRoute>
            ),
          },
          {
            path: "category",
            element: (
              <GuardRoute>
                <CategoryManagement />
              </GuardRoute>
            ),
          },
        ],
      },
    ],
  };
  // push route
  routes.push(route);
}

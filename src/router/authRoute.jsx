import AuthenticateLayout from "../layout/AuthenticateLayout";
import LoginPage from "../pages/auth/LoginPage";

// Xem cấu trúc routes ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <AuthenticateLayout />,
    // Element là AuthenLayout, các children muốn hiển thị được trong AuthenLayout thì trong Layout phải có outlet mới hiển thị được
    // outlet đóng vai trò tương tự children
    // Xem thêm ở https://reactrouter.com/en/main/components/outlet
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  };
  // push route
  routes.push(route);
}

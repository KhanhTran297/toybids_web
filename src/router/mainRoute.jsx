import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/main/HomePage";

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
    ],
  };

  routes.push(route);
}

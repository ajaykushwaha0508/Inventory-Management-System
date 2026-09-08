import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import LoginPage from "../pages/login/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PlaceholderPage from "../pages/PlaceholderPage.jsx";
import Categories from "../pages/Categories.jsx";
import ProductsPage from "../pages/Products.jsx";
import UserProvisioning from "../pages/UserProvisioning.jsx";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // "/"
      { path: "products", element: <ProductsPage /> },
      { path: "categories", element: <Categories /> },
      { path: "settings", element: <UserProvisioning /> },
    ],
  },
]);

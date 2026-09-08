import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import LoginPage from "../pages/login/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PlaceholderPage from "../pages/PlaceholderPage.jsx";
import Categories from "../pages/Categories.jsx";
import ProductsPage from "../pages/Products.jsx";

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
      {
        path: "stock-adjustments",
        element: <PlaceholderPage title="Stock Adjustments" />,
      },
      { path: "reports", element: <PlaceholderPage title="Reports" /> },
      { path: "settings", element: <PlaceholderPage title="Settings" /> },
      {
        path: "warehouse-a1",
        element: <PlaceholderPage title="Warehouse A1" />,
      },
      {
        path: "audit-trails",
        element: <PlaceholderPage title="Audit Trails" />,
      },
    ],
  },
]);

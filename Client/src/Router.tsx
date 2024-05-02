import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NorFound";
import { Cart } from "./components/Cart";
import { Payment } from "./pages/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "cart/payment",
        element: <Payment />
      }
      
    ],
  },
]);

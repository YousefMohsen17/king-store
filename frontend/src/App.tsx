import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/LoginPage.tsx";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/layout/Layout";
import { AuthContextProvider } from "./context/auth/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Home/HomePage.tsx";
import { ProductContextProvider } from "./context/product/productContext.tsx";
import { CartContextProvider } from "./context/cart/cartContext.tsx";
import CategoryPage from "./pages/category/CategoryPage.tsx";
import AdminPage from "./pages/admin/AdminPage.tsx";
// remove from featured if i del product
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/secret-dashboard",
          element: <AdminPage />,
        },
        {
          path: "category/:category",
          element: <CategoryPage />,
        },

        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </CartContextProvider>
          </ProductContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

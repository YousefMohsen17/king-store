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

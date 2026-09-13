import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/layout/Layout";
import { AuthContextProvider } from "./context/auth/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/signup",
          element: <SignupPage />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/layout/Layout";
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
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;

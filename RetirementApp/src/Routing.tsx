import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:"*",
    element:<NotFoundPage/>
  }
]);
function Routing() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default Routing;

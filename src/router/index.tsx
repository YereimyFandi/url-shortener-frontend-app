import {
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "../pages/HomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import App from "../App";
import Home from "../components/pages/Home";
import Protect from "./Protect";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Home />
  },

])

export default appRouter
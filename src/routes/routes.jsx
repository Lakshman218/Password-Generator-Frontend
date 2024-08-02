import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import App from "../App";
import Home from "../components/pages/Home";
import Protect from "./Protect";
import Login from "../components/Login";
import Register from "../components/Register";

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
    element: <Login />
  },
  {
    path: '/signup',
    element: <Register />
  },

])

export default appRouter
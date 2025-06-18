
import "./index.css";
import {
  createBrowserRouter,
} from "react-router";
import AdminInterface from "./pages/admin";
import Home from "./pages/Home";
import { ProtctedScreens } from "./pages/layouts/ProtectedLayout";
import DefaultScreen from "./pages/layouts/DefaultScreen";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";



let router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultScreen,
    children: [
      { index: true, Component: Home },
      {
        path: "auth/", Component: DefaultScreen,
        children: [
          { index: true, path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        path: "records/",
        Component: ProtctedScreens,
        children: [
          { index: true, Component: AdminInterface },

        ],
      },
    ]
  },


]);

export default router;

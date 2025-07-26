
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
import ResetPassword from "./pages/auth/foget_newpost";
import UserDashboard from "./pages/newAdmin";
import Settings from "./pages/Settings";
import MessageLogs from "./pages/systemLogs";
import PostMessage from "./pages/newPost";
import DashBoardIndex from "./pages/dashBoardIndex";
import ErrorPage from "./pages/error";
import Profile from "./pages/prodile";



let router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultScreen,
    children: [

      { index: true, Component: Home },
      {
        path: "dashboard/", Component: UserDashboard,
        children: [

          { index: true, Component: DashBoardIndex },
          { path: "new-post", Component: PostMessage },

          { path: "profile", Component: Profile },
        ]
      },


      {
        path: "auth/", Component: DefaultScreen,
        children: [
          { index: true, path: "login", Component: Login },
          { path: "register", Component: Register },
          { path: "forget-password", Component: ResetPassword },
        ],
      },

      { path: "*", Component: ErrorPage }
    ]
  },


]);

export default router;

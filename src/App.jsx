
import "./index.css";
import {
  createBrowserRouter,
} from "react-router";
import Home from "./pages/Home";
import DefaultScreen from "./pages/layouts/DefaultScreen";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/foget_newpost";
import UserDashboard from "./pages/newAdmin";
import PostMessage from "./pages/newPost";
import DashBoardIndex from "./pages/dashBoardIndex";
import ErrorPage from "./pages/error";
import Profile from "./pages/profile";



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

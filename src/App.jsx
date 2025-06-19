
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
import BoardStatus from "./pages/BoardStatus";
import PostMessage from "./pages/newPost";
import DashBoardIndex from "./pages/dashBoardIndex";
import ErrorPage from "./pages/error";



let router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultScreen,
    children: [

      { index: true, Component: Home },
      {
        path: "new/", Component: UserDashboard, children: [

          { index: true, Component: DashBoardIndex },
          { path: "new-post", Component: PostMessage },
          { path: "settings", Component: Settings },
          { path: "logs", Component: MessageLogs },
          { path: "status", Component: BoardStatus },
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
      {
        path: "app/",
        Component: ProtctedScreens,
        children: [
          { index: true, Component: AdminInterface },
          { path: "admin", Component: UserDashboard },

        ],
      },
      { path: "*", Component: ErrorPage }
    ]
  },


]);

export default router;

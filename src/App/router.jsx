import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "./../Components/Layout/adminLayout";

import Dashboard from "./../Features/dashboard/Dashboard";
import Users from "./../Features/Users/Users";
import Roles from "./../Features/roles/Roles";
import Reports from "./../Features/reports/reports";
import Settings from "./../Features/settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
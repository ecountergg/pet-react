import { RouteObject } from "react-router-dom";

import { AdminIndex } from "@/pages/admin/index";
import { UsersIndex } from "@/pages/admin/users";
import { DashboardIndex } from "@/pages/admin/dashboard";

const ADMIN_ROUTES: RouteObject[] = [
  {
    path: "admin",
    element: <AdminIndex />,
    children: [
      {
        path: "dashboard",
        element: <DashboardIndex />,
      },
      {
        path: "users",
        element: <UsersIndex />,
      },
    ],
  },
];

export default ADMIN_ROUTES;

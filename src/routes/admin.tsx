import { Navigate, RouteObject } from "react-router-dom";

import { AdminIndex } from "@/pages/admin/index";
import { UsersIndex } from "@/pages/admin/users";
import { DashboardIndex } from "@/pages/admin/dashboard";
import { AuthorsIndex } from "@/pages/admin/master-data/authors";

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
      {
        path: "master-data",
        children: [
          {
            index: true,
            element: <Navigate to="/admin/master-data/authors" replace />,
          },
          {
            path: "authors",
            element: <AuthorsIndex />,
          },
        ],
      },
    ],
  },
];

export default ADMIN_ROUTES;

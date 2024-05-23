import { RouteObject } from "react-router-dom";

import AuthGuard from "@/guards/auth";
import { AdminIndex } from "@/pages/admin/index";

const ADMIN_ROUTES: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AuthGuard>
        <AdminIndex />
      </AuthGuard>
    ),
  },
];

export default ADMIN_ROUTES;

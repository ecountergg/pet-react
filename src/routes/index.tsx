import { RouteObject } from "react-router-dom";

import { App } from "@/App";
import ADMIN_ROUTES from "./admin";
import UnAuthGuard from "@/guards/un-auth";

const APP_ROUTES: RouteObject[] = [
  {
    path: "/",
    element: (
      <UnAuthGuard>
        <App />
      </UnAuthGuard>
    ),
  },
  ...ADMIN_ROUTES,
];

export default APP_ROUTES;

import { Outlet } from "react-router-dom";

import { Admin } from "@/components/templates/admin/index";

export const AdminIndex = () => {
  return (
    <Admin>
      <Outlet />
    </Admin>
  );
};

import { Admin } from "@/components/templates/admin/index";
import { Outlet } from "react-router-dom";

export const AdminIndex = () => {
  return (
    <Admin>
      <Outlet />
    </Admin>
  );
};

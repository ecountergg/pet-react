import { useEffect } from "react";

import { setBreadrumbs } from "@/stores/breadcrumb";
import { useDispatch } from "react-redux";

export const DashboardIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadrumbs([
        {
          href: "#",
          label: "Dashboard",
        },
      ])
    );
  }, []);

  return <h1>Dashboard Index</h1>;
};

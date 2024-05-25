import { useEffect } from "react";

import { setBreadrumbs } from "@/stores/breadcrumb";
import { useDispatch } from "react-redux";

export const UsersIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadrumbs([
        {
          href: "#",
          label: "Users",
        },
      ])
    );
  }, []);

  return <h1>Users Index</h1>;
};

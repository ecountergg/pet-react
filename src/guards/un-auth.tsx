import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnAuthGuard = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = Boolean(localStorage.getItem("authToken"));

    if (token) {
      return navigate(-1);
    }
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default UnAuthGuard;

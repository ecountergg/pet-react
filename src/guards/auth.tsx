import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = Boolean(localStorage.getItem("authToken"));

    if (!token) {
      return navigate("/");
    }
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;

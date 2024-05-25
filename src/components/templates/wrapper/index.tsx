import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/atoms/toast/use-toast";
import { $http } from "@/lib/http";
import { ErrorResponse } from "@/types/response";
import { Toaster } from "@/components/atoms/toast/toaster";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Wrapper = ({ children }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fail, setFail] = useState<ErrorResponse>({
    error: null,
    statusCode: null,
    message: null,
  });

  useEffect(() => {
    if (
      fail.statusCode === HttpStatusCode.Unauthorized &&
      fail.error === "Unauthorized"
    ) {
      localStorage.removeItem("authToken");

      navigate("/", {
        replace: true,
      });
    }
  }, [fail, navigate]);

  $http.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  $http.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse: ErrorResponse = error.response
        ? error.response.data
        : null;

      if (
        fail.statusCode === HttpStatusCode.Unauthorized &&
        fail.error === "Unauthorized"
      ) {
        localStorage.removeItem("authToken");
        navigate("/", {
          replace: true,
        });
      }

      toast({
        variant: "destructive",
        title: errorResponse.error ?? "",
        description: errorResponse.message,
      });
      setFail(errorResponse);

      return Promise.reject(error);
    }
  );

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

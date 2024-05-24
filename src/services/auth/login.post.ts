import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export const loginPost = async (payload: ILoginPayload) => {
  const res = await $http.post<GenericResponse<ILoginResponse>>(
    `auth/login`,
    payload
  );

  return res.data;
};

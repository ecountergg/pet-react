import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response";

export interface IProfileResponse {
  exp: number;
  lat: number;
  sub: number;
  username: string;
}

export const profileGet = async () => {
  const res = await $http.get<GenericResponse<IProfileResponse>>(
    `users/profile`
  );

  return res.data;
};

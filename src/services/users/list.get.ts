import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request";
import {
  GenericResponse,
  IBaseResponse,
  PaginationResponse,
} from "@/types/response";

export interface IParamsUser {
  username?: string;
}

export interface IUsersResponse extends IBaseResponse {
  name: string;
  bio: string | null;
  birth_year: number | null;
}

export type UsersFilter = PaginationFilter<IParamsUser>;

export const usersGet = async (
  params: UsersFilter
): Promise<GenericResponse<PaginationResponse<IUsersResponse>>> => {
  const res = await $http.get<
    GenericResponse<PaginationResponse<IUsersResponse>>
  >(`users`, {
    params,
  });
  return res.data;
};

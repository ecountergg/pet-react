import { $http } from "@/lib/http";
import { PaginationFilter } from "@/types/request";
import {
  GenericResponse,
  IBaseResponse,
  PaginationResponse,
} from "@/types/response";

export interface IParamsAuthor {
  name?: string;
  birthYear?: string;
}

export interface IAuthorsResponse extends IBaseResponse {
  name: string;
  bio: string | null;
  birth_year: number | null;
}

export type AuthorsFilter = PaginationFilter<IParamsAuthor>;

export const authorsGet = async (
  params: AuthorsFilter
): Promise<GenericResponse<PaginationResponse<IAuthorsResponse>>> => {
  const res = await $http.get<
    GenericResponse<PaginationResponse<IAuthorsResponse>>
  >(`authors`, {
    params,
  });
  return res.data;
};

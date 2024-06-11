import { $http } from "@/lib/http";
import { GenericResponse } from "@/types/response";
import { IAuthorsResponse } from "./list.get";

export interface IAuthorPayload {
  name: string;
  birthYear: number;
  bio: string;
}

export const authorCreatePost = async (
  payload: IAuthorPayload
): Promise<GenericResponse<IAuthorsResponse>> => {
  const res = await $http.post<GenericResponse<IAuthorsResponse>>(
    `authors`,
    payload
  );
  return res.data;
};

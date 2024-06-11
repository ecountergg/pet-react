import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { AUTHORS_KEY } from "./query-key";
import { GenericResponse, PaginationResponse } from "@/types/response";
import {
  IAuthorsResponse,
  AuthorsFilter,
  authorsGet,
} from "@/services/authors/list.get";
import { LIMIT } from "@/consts/pagination";

export const useAuthorListGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<IAuthorsResponse>>>,
    "queryKey" | "queryFn"
  >
) => {
  const [filter, setFilter] = useState<AuthorsFilter>({
    page: 1,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IAuthorsResponse>>>({
      queryKey: AUTHORS_KEY.list(filter),
      queryFn: () => authorsGet(filter),
      ...options,
    }),
  };
};

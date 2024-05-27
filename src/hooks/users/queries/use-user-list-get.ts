import { useState } from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { USERS_KEY } from "./query-key";
import { GenericResponse, PaginationResponse } from "@/types/response";
import {
  IUsersResponse,
  UsersFilter,
  usersGet,
} from "@/services/users/list.get";
import { LIMIT } from "@/consts/pagination";

export const useUserListGet = (
  options?: Omit<
    UseQueryOptions<GenericResponse<PaginationResponse<IUsersResponse>>>,
    "queryKey" | "queryFn"
  >
) => {
  const [filter, setFilter] = useState<UsersFilter>({
    page: 1,
    limit: LIMIT,
  });

  return {
    filter,
    setFilter,
    ...useQuery<GenericResponse<PaginationResponse<IUsersResponse>>>({
      queryKey: USERS_KEY.list(filter),
      queryFn: () => usersGet(filter),
      ...options,
    }),
  };
};

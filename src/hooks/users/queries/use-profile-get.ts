import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  type IProfileResponse,
  profileGet,
} from "@/services/users/profile.get";
import { GenericResponse } from "@/types/response";
import { USERS_KEY } from "./query-key";

export const useProfileGet = (
  queryOpts?: UseQueryOptions<GenericResponse<IProfileResponse>>
) => {
  return {
    ...useQuery<GenericResponse<IProfileResponse>>({
      queryKey: USERS_KEY.profile(),
      queryFn: () => profileGet(),
      ...queryOpts,
    }),
  };
};

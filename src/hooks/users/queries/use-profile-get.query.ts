import { UseQueryOptions, useQuery } from "react-query";

import {
  type IProfileResponse,
  profileGet,
} from "@/services/users/profile.get";
import { GenericResponse } from "@/types/response";
import { USERS_KEY } from "./query-key";

export const useProfileGet = (
  queryOpts?: UseQueryOptions<GenericResponse<IProfileResponse>>
) => {
  return useQuery<GenericResponse<IProfileResponse>>(
    USERS_KEY.profile(),
    () => profileGet(),
    queryOpts
  );
};

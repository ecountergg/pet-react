import { useMutation } from "@tanstack/react-query";

import { UseCustomMutationOptions } from "@/types/react-query";
import {
  IAuthorPayload,
  authorCreatePost,
} from "@/services/authors/create.post";
import { IAuthorsResponse } from "@/services/authors/list.get";

export const useCreateAuthorPost = (
  mutationOpts?: UseCustomMutationOptions<IAuthorPayload, IAuthorsResponse>
) => {
  return useMutation({
    mutationFn: (payload: IAuthorPayload) => {
      return authorCreatePost(payload);
    },
    ...mutationOpts,
  });
};

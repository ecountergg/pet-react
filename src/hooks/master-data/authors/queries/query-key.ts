import { AuthorsFilter } from "@/services/authors/list.get";

export const AUTHORS_KEY = {
  all: ["authors"] as const,
  list: (filter: AuthorsFilter) => [AUTHORS_KEY.all, "list", { ...filter }],
};

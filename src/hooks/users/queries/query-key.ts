import { UsersFilter } from "@/services/users/list.get";

export const USERS_KEY = {
  all: ["users"] as const,
  profile: () => [USERS_KEY.all, "profile"],
  list: (filter: UsersFilter) => [USERS_KEY.all, "list", { ...filter }],
};

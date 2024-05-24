export const USERS_KEY = {
  all: ["users"] as const,
  profile: () => [USERS_KEY.all, "profile"],
};

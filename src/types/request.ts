import { SORT_DIRECTION } from "@/consts/request";

export type EnumSortDirection =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export type PaginationFilter<TFilter = object> = {
  [Key in keyof TFilter]: TFilter[Key];
} & {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: EnumSortDirection;
};

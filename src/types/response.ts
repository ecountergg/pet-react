import { HttpStatusCode } from "axios";

export type GenericResponse<T> = {
  statusCode: string;
  message: HttpStatusCode;
  data: T;
};

export type PaginationMetaResponse = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMetaResponse;
};

export type ErrorResponse = {
  message: string | null;
  error: string | null;
  statusCode: HttpStatusCode | null;
};

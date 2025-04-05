import { PaginationDto } from '../dtos';

export const PAGINATION_DEFAULT_PAGE = 1;
export const PAGINATION_MIN_PAGE = 1;
export const PAGINATION_DEFAULT_SIZE = 10;
export const PAGINATION_MIN_SIZE = 1;
export const PAGINATION_MAX_SIZE = 100;

export const PAGINATION_DEFAULT_PARAMS: PaginationDto = {
  page: PAGINATION_DEFAULT_PAGE,
  size: PAGINATION_DEFAULT_SIZE,
};

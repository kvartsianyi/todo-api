export interface IPaginatedResource<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}

export interface PagedResponse<T> {
    pageIndex: number;
    pageSize: number;
    data: T[];
    totalCount: number;
    totalPage: number;
  }
import { IProducts } from "./product"

export interface  IPagination{
  pageNumber: number
  pageSize: number
  count: number
  data:IProducts[]
}

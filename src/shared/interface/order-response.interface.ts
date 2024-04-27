import { IProductResponse } from './product-response.interface'

export interface IOrderResponse {
  order_id: number
  total: string
  date: string
  products: IProductResponse[]
}

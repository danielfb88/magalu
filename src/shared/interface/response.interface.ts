import { IOrderResponse } from './order-response.interface'

export interface IResponse {
  user_id: number
  name: string
  orders: IOrderResponse[]
}

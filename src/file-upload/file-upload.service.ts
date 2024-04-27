import { Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import * as _ from 'lodash'
import { IOrderDomain } from '../shared/interface/order.domain.interface'
import { IProductDomain } from '../shared/interface/product.domain.interface'
import { IResponse } from '../shared/interface/response.interface'
import { IRow } from '../shared/interface/row.interface'
import { ISortedOrder } from '../shared/interface/sorted-order.interface'
import { ISortedUser } from '../shared/interface/sorted-user.interface'
import { IUserDomain } from '../shared/interface/user.domain.interface'

@Injectable()
export class FileUploadService {
  constructor() {}

  async streamToString(stream): Promise<string> {
    const chunks = []
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream.on('error', (err) => reject(err))
      stream.on('end', () =>
        resolve(Buffer.concat(chunks).toString('utf8')),
      )
    })
  }

  stringToArray(data: string): string[] {
    const dataList = data.split('\n')

    const result = []
    for (let i = 0; i < dataList.length; i++) {
      result[i] = _.map(_.compact(dataList[i].split('  ')), _.trim)
    }

    return result
  }

  mapStringToFields(data: string): IRow[] {
    const dataList = data.split('\n')

    const rowList = dataList.map((row) => {
      const userId = row.substring(0, 10).trim()
      const userName = row.substring(10, 55).trim()
      const orderId = row.substring(55, 65).trim()
      const prodId = row.substring(65, 75).trim()
      const value = row.substring(75, 87).trim()
      const date = row.substring(87, 95).trim()

      return { userId, userName, orderId, prodId, value, date }
    })

    return rowList
  }

  getDateFromString(dateString: string): Date {
    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)

    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
    )

    return date
  }

  getSortedUsers(rowList: IRow[]): ISortedUser[] {
    const userList = _.uniqBy(
      rowList.map((row) => {
        return { id: parseInt(row.userId), name: row.userName }
      }),
      'id',
    )
    return userList.sort((a, b) => a.id - b.id)
  }

  getSortedOrders(rowList: IRow[]): ISortedOrder[] {
    const orderList = _.uniqBy(
      rowList.map((row) => {
        return {
          userId: parseInt(row.userId),
          orderId: parseInt(row.orderId),
          date: row.date,
        }
      }),
      'orderId',
    )
    return orderList.sort((a, b) => a.orderId - b.orderId)
  }

  formatResponse(
    savedUserList: IUserDomain[],
    savedOrderList: IOrderDomain[],
    savedProductList: IProductDomain[],
  ): IResponse[] {
    const responseList: IResponse[] = []

    for (const user of savedUserList) {
      const orderList = savedOrderList.filter(
        (order) => order.user.id === user.id,
      )

      const mappedOrders = []

      for (const order of orderList) {
        let total = 0
        const productList = savedProductList.filter(
          (product) => product.order.id === order.id,
        )

        for (const product of productList) {
          total += product.value
        }

        mappedOrders.push({
          order_id: order.externalId,
          total,
          date: format(order.orderDate, 'yyyy-MM-dd'),
          products: productList.map((product) => {
            return {
              product_id: product.externalId,
              value: product.value,
            }
          }),
        })
      }

      responseList.push({
        user_id: user.externalId,
        name: user.name,
        orders: mappedOrders,
      })
    }

    return responseList
  }
}

import { Injectable } from '@nestjs/common'
import * as _ from 'lodash'

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

  mapStringToFields(data: string): string[][] {
    const dataList = data.split('\n')

    const mappedList = dataList.map((row) => {
      const userId = row.substring(0, 10).trim()
      const userName = row.substring(10, 55).trim()
      const orderId = row.substring(55, 65).trim()
      const prodId = row.substring(65, 75).trim()
      const value = row.substring(75, 87).trim()
      const date = row.substring(87, 95).trim()

      return [userId, userName, orderId, prodId, value, date]
    })

    return mappedList
  }

  getSortedUsers(dataList: string[][]): { id: number; name: string }[] {
    const userList = _.uniqBy(
      dataList.map((data) => {
        return { id: parseInt(data[0]), name: data[1] }
      }),
      'id',
    )
    return userList.sort((a, b) => a.id - b.id)
  }

  getSortedOrders(
    dataList: string[][],
  ): { userId: number; orderId: number; date: string }[] {
    const orderList = _.uniqBy(
      dataList.map((data) => {
        return {
          userId: parseInt(data[0]),
          orderId: parseInt(data[2]),
          date: data[5],
        }
      }),
      'orderId',
    )
    return orderList.sort((a, b) => a.orderId - b.orderId)
  }

  getDateFromString(dateString: string): Date {
    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)

    const date = new Date(parseInt(year), parseInt(month), parseInt(day))

    return date
  }
}

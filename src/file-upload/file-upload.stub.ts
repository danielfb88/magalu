export const fileUploadServiceStub = () => ({
  createReadStream: jest.fn(),
  streamToString: jest.fn(),
  stringToArray: jest.fn(),
  mapStringToFields: jest.fn(),
  getDateFromString: jest.fn(),
  getSortedUsers: jest.fn(),
  getSortedOrders: jest.fn(),
  formatResponse: jest.fn(),
})

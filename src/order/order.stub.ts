export const orderServiceStub = () => ({
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  getByDate: jest.fn(),
  formatResponse: jest.fn(),
})

export const orderRepositoryStub = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
})

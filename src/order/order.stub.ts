export const orderServiceStub = () => ({
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  getByDate: jest.fn(),
  formatResponse: jest.fn(),
})

export const orderRepositoryStub = () => ({
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  getByDate: jest.fn(),
})

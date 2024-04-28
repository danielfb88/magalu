export const productServiceStub = () => ({
  findAll: jest.fn(),
  findByOrder: jest.fn(),
  save: jest.fn(),
})

export const productRepositoryStub = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
})

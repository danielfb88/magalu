export const userServiceStub = () => ({
  findAll: jest.fn(),
  save: jest.fn(),
})

export const userRepositoryStub = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
})

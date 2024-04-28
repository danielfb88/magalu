export const repositoryStub = () => ({
  createQueryBuilder: jest.fn().mockImplementation(() => {
    return {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      select: jest.fn().mockReturnThis(),
      setParameters: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
    }
  }),
  query: jest.fn().mockReturnThis(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
})

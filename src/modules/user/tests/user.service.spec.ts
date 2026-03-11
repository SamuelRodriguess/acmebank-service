import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with default values', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    const dto = { username: 'testuser', password: 'password' };
    const user = await service.create(dto);

    expect(user.username).toBe(dto.username);
    expect(user.balance).toBe(0);
    expect(user.file_history).toBe('');
    expect(user.account_no).toBeDefined();
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should throw an error if user already exists', async () => {
    mockUserRepository.findOne.mockResolvedValue({ username: 'testuser' });
    const dto = { username: 'testuser', password: 'password' };

    await expect(service.create(dto)).rejects.toThrow('Usuário já existe.');
  });
});

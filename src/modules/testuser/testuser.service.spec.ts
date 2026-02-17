import { Test, TestingModule } from '@nestjs/testing';
import { TestuserService } from './testuser.service';

describe('TestuserService', () => {
  let service: TestuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestuserService],
    }).compile();

    service = module.get<TestuserService>(TestuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

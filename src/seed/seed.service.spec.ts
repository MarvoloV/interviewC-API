import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';

import { CommerceService } from 'src/commerce/commerce.service';

describe('SeedService', () => {
  let service: SeedService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        { provide: CommerceService, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

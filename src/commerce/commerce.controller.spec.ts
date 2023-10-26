import { Test, TestingModule } from '@nestjs/testing';
import { CommerceController } from './commerce.controller';
import { CommerceService } from './commerce.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { Repository } from 'typeorm';

describe('CommerceController', () => {
  let commerceController: CommerceController;
  const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommerceController],
      providers: [
        CommerceService,
        {
          provide: getRepositoryToken(Commerce),
          useClass: Repository,
        },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    commerceController = module.get<CommerceController>(CommerceController);
  });

  it('should be defined', () => {
    expect(commerceController).toBeDefined();
  }, 20000);
});

import { Test, TestingModule } from '@nestjs/testing';
import { CommerceService } from './commerce.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Commerce } from './entities/commerce.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CommerceService', () => {
  let service: CommerceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommerceService,
        {
          provide: getRepositoryToken(Commerce),
          useClass: Repository,
        },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<CommerceService>(CommerceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }, 2000000);
});

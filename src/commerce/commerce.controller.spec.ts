import { Test, TestingModule } from '@nestjs/testing';
import { CommerceController } from './commerce.controller';
import { CommerceService } from './commerce.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';
import { Repository } from 'typeorm';

describe('CommerceController', () => {
  let controller: CommerceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommerceController],
      providers: [
        CommerceService,
        {
          provide: getRepositoryToken(Commerce),
          useClass: Repository,
        },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<CommerceController>(CommerceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  }, 20000);
});

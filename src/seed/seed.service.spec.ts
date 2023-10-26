import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';

import { CommerceService } from 'src/commerce/commerce.service';

describe('SeedService', () => {
  let service: SeedService;

  const mockCommerceService = {
    runSeed: jest.fn(),
    deleteAllProducts: jest.fn().mockResolvedValueOnce(true),
    create: jest.fn().mockResolvedValueOnce(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        { provide: CommerceService, useValue: mockCommerceService },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should delete all existing products before inserting new ones', async () => {
    await service.runSeed();

    expect(mockCommerceService.deleteAllProducts).toHaveBeenCalled();
    expect(mockCommerceService.create).toHaveBeenCalled();
  });
});

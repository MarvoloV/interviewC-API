import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('TokenService', () => {
  let service: TokenService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

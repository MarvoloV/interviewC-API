import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateTokenDto } from './dto/create-token.dto';

describe('TokenService', () => {
  let service: TokenService;
  const mockTokenService = {
    set: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: CACHE_MANAGER, useValue: mockTokenService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should generate a 16 character token with alphanumeric characters when createTokenDto is valid', async () => {
    const createTokenDto = new CreateTokenDto();

    const result = await service.create(createTokenDto);

    expect(result.token).toHaveLength(16);
    expect(result.token).toMatch(/^[a-zA-Z0-9]+$/);
  });
});

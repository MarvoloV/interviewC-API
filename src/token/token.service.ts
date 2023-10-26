import { Inject, Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async create(createTokenDto: CreateTokenDto) {
    const caracteres =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';

    for (let i = 0; i < 16; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(indiceAleatorio);
    }
    await this.cacheManager.set(token, createTokenDto);
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem);
    return { token };
  }
}

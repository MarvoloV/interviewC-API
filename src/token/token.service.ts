import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  create(createTokenDto: CreateTokenDto) {
    console.log(
      '🚀 ~ file: token.service.ts:7 ~ TokenService ~ create ~ createTokenDto:',
      createTokenDto,
    );
    const caracteres =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';

    for (let i = 0; i < 16; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(indiceAleatorio);
    }
    return { token };
  }
}

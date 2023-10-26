import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CreateCommerceDto } from './dto/create-commerce.dto';

@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Post()
  create(@Body() createCommerceDto: CreateCommerceDto) {
    return this.commerceService.create(createCommerceDto);
  }

  @Get('')
  findOne(
    @Headers('X-Comercio-ID') CommerceId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.commerceService.findOne(CommerceId, token);
  }
}

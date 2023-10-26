import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Commerce } from './entities/commerce.entity';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { validate as isUUID } from 'uuid';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CommerceService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createCommerceDto: CreateCommerceDto) {
    try {
      const commerce = this.commerceRepository.create(createCommerceDto);
      await this.commerceRepository.save(commerce);
      return commerce;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string, token: string) {
    const cardData = await this.cacheManager.get(token);

    if (!cardData) {
      throw new UnauthorizedException(`Unauthorized`);
    }
    if (!isUUID(id)) {
      throw new BadRequestException(`Commerce with ${id} not valid`);
    }
    const commerce = await this.commerceRepository.findOneBy({ id });
    if (!commerce) {
      throw new NotFoundException(`Commerce with ${id} not found`);
    }
    return commerce;
  }
  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
  async deleteAllProducts() {
    const query = this.commerceRepository.createQueryBuilder('commerce');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}

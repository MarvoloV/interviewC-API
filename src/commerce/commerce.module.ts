import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { Commerce } from './entities/commerce.entity';

@Module({
  controllers: [CommerceController],
  providers: [CommerceService],
  imports: [TypeOrmModule.forFeature([Commerce])],
  exports: [CommerceService, TypeOrmModule],
})
export class CommerceModule {}

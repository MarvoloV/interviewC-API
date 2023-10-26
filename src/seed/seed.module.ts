import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommerceModule } from 'src/commerce/commerce.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CommerceModule],
})
export class SeedModule {}

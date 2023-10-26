import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { CommerceModule } from './commerce/commerce.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      ttl: 10,
      host: 'localhost',
      port: 6379,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      database: 'DemoDB',
      username: 'sa',
      password: 'Jadco0812@',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: false,
        // trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    }),
    TokenModule,
    CommerceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

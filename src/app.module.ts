import { Module, } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheConfigService } from './cacheconfig.service';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    TypeOrmConfigService,
    CacheConfigService, AppService],
})
export class AppModule { }

import { Module, } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { CacheConfigService } from './config/cacheconfig.service';
import { TypeOrmConfigService } from './config/typeorm.service';
import { SupabaseGuard, SupabaseModule } from './common/supabase';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule, SupabaseModule,
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
    CacheConfigService, AppService,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class AppModule { }

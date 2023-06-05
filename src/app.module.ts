import { Module, } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from "cache-manager-redis-store";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientOptions } from 'redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "nestjsDB",
      port: 5432,
      username: "rsahani",
      password: "plumtree",
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: "",
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

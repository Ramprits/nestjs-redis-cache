import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {

    constructor(private readonly configService: ConfigService) {
    }
    createCacheOptions(): CacheModuleOptions {
        return {
            isGlobal: true,
            store: redisStore,
            url: this.configService.get("UPSTASH_REDIS_REST_URL")
        };
    }
}
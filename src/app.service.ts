import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
  }
  async getHello() {
    await this.cacheManager.set("cache_manager", { key: 2323 })
    const cachedData = await this.cacheManager.get("cache_manager")
    console.log(cachedData)
    return 'Hello World!';
  }
}

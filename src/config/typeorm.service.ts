import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly config: ConfigService) {
    }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            database: this.config.get<string>('POSTGRES_DB'),
            port: 5432,
            username: this.config.get<string>('POSTGRES_USER'),
            password: this.config.get('POSTGRES_PASSWORD'),
            autoLoadEntities: true,
            synchronize: true
        };
    }
}

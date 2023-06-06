import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            database: "nestjsDB",
            port: 5432,
            username: "rsahani",
            password: "plumtree",
            autoLoadEntities: true,
            synchronize: true
        };
    }
}

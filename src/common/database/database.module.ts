import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DbMigrationService } from './db-migration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  // DB 마이그레이션 서비스를 외부로 노출
  providers: [DbMigrationService],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
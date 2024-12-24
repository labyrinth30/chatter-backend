import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';

@Injectable()
export class DbMigrationService implements OnModuleInit {
  // DB 마이그레이션을 위한 구성 객체
  private readonly dbMigrationConfig: Partial<config.Config> = {
    mongodb: {
      databaseName: this.configService.getOrThrow('DB_NAME'),
      url: this.configService.getOrThrow('MONGODB_URI'),
    },
    // 마이그레이션 파일이 저장될 디렉토리
    migrationsDir: `${__dirname}/../../migrations`,
    // 변경 로그를 저장할 컬렉션 이름
    changelogCollectionName: 'changelog',
    // 마이그레이션 파일의 확장자
    migrationFileExtension: '.js',
  };

  constructor(private readonly configService: ConfigService) {}

  // 모듈 초기화 시 DB 마이그레이션을 수행
  async onModuleInit() {
    // migrate-mongo의 설정을 설정 객체로 전달
    config.set(this.dbMigrationConfig);
    // DB에 연결하고 마이그레이션을 수행
    const { db, client } = await database.connect();
    await up(db, client);
  }
}

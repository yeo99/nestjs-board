import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as config from 'config';
dotenv.config();
const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
  type: process.env.type || dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: process.env.DB || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //데이터베이스 테이블을 생성하는데 사용
  synchronize: true, //애플리케이션을 재시작 시 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
};

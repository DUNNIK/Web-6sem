import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "./auth/auth.module";

const parse = require('pg-connection-string').parse;
const config = parse('postgres://qsswnldnhzgnpp:a5188af3860c055193fa7bdf2bccf7fe57a2cb9f2cd297b7922c22f4269fb136@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d7n7laspvbi76n');

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: config.user,
      host: config.host,
      port: config.port,
      password: config.password,
      database: config.database,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
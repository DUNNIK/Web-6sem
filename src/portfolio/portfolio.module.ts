import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import {Portfolio} from "../entities/portfolio.entity";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        MulterModule.register({
            dest: './public/uploads/avatar',
        }),
        TypeOrmModule.forFeature([Portfolio])
    ],
    controllers: [PortfolioController],
    providers: [PortfolioService],
    exports: [PortfolioService]
})
export class PortfolioModule {
}
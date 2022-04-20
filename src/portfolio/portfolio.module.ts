import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import {Portfolio} from "../entities/portfolio.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Portfolio])],
    controllers: [PortfolioController],
    providers: [PortfolioService],
    exports: [PortfolioService]
})
export class PortfolioModule {}
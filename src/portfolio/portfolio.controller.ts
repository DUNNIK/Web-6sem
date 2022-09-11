import { PortfolioService } from './portfolio.service';
import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Portfolio} from "../entities/portfolio.entity";

@ApiBearerAuth()
@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get('/get')
    @ApiOperation({ summary: 'Get all Portfolios' })
    @ApiResponse({
        status: 200,
        description: 'Get all portfolios',
        type: Portfolio,
    })
    getUsers(): Promise<Portfolio[]> {
        return this.portfolioService.findAll();
    }

    @Get('/findOneByEmail')
    @ApiOperation({ summary: 'Find user by userId' })
    @ApiResponse({
        status: 200,
        description: 'The found record by userId',
        type: Portfolio,
    })
    findOneByEmail(@Param('userId') userId : string): Promise<Portfolio> {
        return this.portfolioService.findOne(userId);
    }

    @Post('/add')
    @ApiOperation({ summary: 'Add portfolio' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({status: 500, description: "Internal server error"})
    async addProfile(portfolio : any, @Res() res): Promise<void> {
        await this.portfolioService.addPortfolio(portfolio, null);
    }
}
import { PortfolioService } from './portfolio.service';
import {Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PortfolioDto} from "./dto/portfolio.dto";
import {validate} from "class-validator";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Portfolio} from "../entities/portfolio.entity";
import {FileInterceptor} from "@nestjs/platform-express";

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
    async addProfile(portfolio : any, @Res() res, user : any): Promise<void> {
        let isOk = false;
        const portfolioDto = new PortfolioDto();
        portfolioDto.githubLogin = portfolio.githubLogin;
        portfolioDto.instagramLogin = portfolio.instagramLogin;
        portfolioDto.telegramLogin = portfolio.telegramLogin;
        portfolioDto.vkLogin = portfolio.vkLogin;
        portfolioDto.name = portfolio.name;
        portfolioDto.surname = portfolio.name;


        await validate(portfolioDto).then(errors => {
            if (errors.length > 0) {
                console.log(errors);
            } else {
                isOk = true;
            }
        });

        if (isOk) {
            await this.portfolioService.addPortfolioWithoutUser(portfolioDto);
        } else {
            res.status(400).json({ msg: 'Invalid request' });
        }
    }

    @Post('changeImage')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'change portfolio image' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({status: 201, description: 'Success'})
    async changeImage(@Body('id') portfolioId : string, @UploadedFile() file: Express.Multer.File): Promise<Portfolio> {
        console.log(portfolioId);
        let portfolio = await this.portfolioService.findOne(portfolioId);
        portfolio.profileImage = file.filename;
        await this.portfolioService.addPortfolioWithoutUser(portfolio)
        return await this.portfolioService.findOne(portfolioId);
    }
}
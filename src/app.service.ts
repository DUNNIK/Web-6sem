import {Body, Injectable, Res} from '@nestjs/common';
import {UsersController} from "./users/users.controller";
import {UsersService} from "./users/users.service";
import {PortfolioService} from "./portfolio/portfolio.service";
import {UsersDTO} from "./users/dto/users.dto";
import {PortfolioDto} from "./portfolio/dto/portfolio.dto";
import {validate} from "class-validator";
import { v4 as uuidv4 } from 'uuid';
import {Response} from "express";
import {User} from "./entities/user.entity";

@Injectable()
export class AppService {

  constructor(private readonly usersService: UsersService, private readonly portfolioService: PortfolioService) {}

  async editPortfolio(@Res() res: Response, user: any, portfolio: any) {
    const portfolioDto = new PortfolioDto();
    portfolioDto.githubLogin = portfolio.githubLogin;
    portfolioDto.instagramLogin = portfolio.instagramLogin;
    portfolioDto.telegramLogin = portfolio.telegramLogin;
    portfolioDto.vkLogin = portfolio.vkLogin;
    portfolioDto.name = portfolio.name;
    portfolioDto.surname = portfolio.surname;


    let userFind = await this.usersService.findOne(user.id);


    await this.portfolioService.addPortfolio(portfolioDto, userFind);
  }


}

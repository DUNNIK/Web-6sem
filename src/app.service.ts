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
import {AuthenticatedGuard} from "./common/guards/authenticated.guard";

@Injectable()
export class AppService {

  constructor(private readonly usersService: UsersService, private readonly portfolioService: PortfolioService) {
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async editPortfolio(user: any, portfolio: any) {
    const portfolioDto = new PortfolioDto();
    if (portfolio.githubLogin) {
      portfolioDto.githubLogin = portfolio.githubLogin;
    }
    if (portfolio.instagramLogin) {
      portfolioDto.instagramLogin = portfolio.instagramLogin;
    }
    if (portfolio.telegramLogin) {
      portfolioDto.telegramLogin = portfolio.telegramLogin;
    }
    if (portfolio.vkLogin) {
      portfolioDto.vkLogin = portfolio.vkLogin;
    }
    if (portfolio.name) {
      portfolioDto.name = portfolio.name;
    }
    if (portfolio.surname) {
      portfolioDto.surname = portfolio.surname;
    }
    if (portfolio.profileImage) {
      portfolioDto.profileImage = portfolio.profileImage;
    } else {
      portfolioDto.profileImage = String(this.randomIntFromInterval(1, 15));
    }


    const userFind = await this.usersService.findOne(user.id);

    let portfolioF;
    if (userFind) {
      portfolioF = await this.usersService.getUserPortfolio(userFind.id);
    }

    let portfolioFind;
    if (portfolioF) {
      portfolioFind = await this.portfolioService.findOne(portfolioF.id);
    }

    if (portfolioFind) {
      portfolioDto.id = portfolioF.id;
      await this.portfolioService.updatePortfolio(portfolioDto)
    }
    else {
      await this.portfolioService.addPortfolio(portfolioDto, userFind);
    }


  }

  async createUser(user: any): Promise<any> {
    const userDTO = new UsersDTO();
    userDTO.email = user.email;
    userDTO.pass = user.password;
    const portfolioDTO = new PortfolioDto();
    await this.usersService.addUser(userDTO);
    await this.portfolioService.addPortfolio(portfolioDTO, userDTO)
  }

}

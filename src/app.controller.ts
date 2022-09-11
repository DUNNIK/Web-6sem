import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards, UseFilters, Render, Res,
} from '@nestjs/common';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth/auth.service";
import {UsersDTO} from "./users/dto/users.dto";
import {PortfolioService} from "./portfolio/portfolio.service";
import {AppService} from "./app.service";
import {PortfolioDto} from "./portfolio/dto/portfolio.dto";
import {UsersService} from "./users/users.service";
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import {MessagesService} from "./messages/messages.service";

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/avatar',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })

}


@ApiBearerAuth()
@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  private wasEditPortfolio : Boolean = false;
  private wasEditChat : Boolean = false;

  constructor(private readonly authService: AuthService, private readonly messagesService: MessagesService, private readonly portfolioService: PortfolioService, private readonly appService: AppService, private readonly usersService: UsersService) {

  }

  @Get('/')
  @Render('login')
  @ApiOperation({ summary: 'Load login page' })
  @ApiResponse({
    status: 200,
    description: 'Index page has loaded',
    type: User,
  })
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Validate user' })
  @ApiResponse({
    status: 201,
    description: 'Validation passed without errors',
    type: User,
  })
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @Get('/registration')
  @Render('registration')
  @ApiOperation({summary: 'Load registration page'})
  @ApiResponse({
    status: 200,
    description: 'Index page has loaded',
    type: User,
  })
  registerLoad(@Request() req): { message: string } {
    return { message: req.flash('registration Error') };
  }


  @Post('/registration')
  @ApiOperation({summary: 'Register User'})
  @ApiResponse({
    status: 200,
    description: 'Index page has loaded',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Not valid email' })
  async register(@Res() res: Response, @Body() usersDTO: UsersDTO) {
    await this.appService.createUser(usersDTO)
    res.redirect('/');
  }


  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @ApiOperation({ summary: 'Load home page' })
  @ApiResponse({
    status: 200,
    description: 'Home page has loaded',
    type: User,
  })
  @Render('home')
  getHome(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @ApiOperation({summary: 'Load profile page'})
  @ApiResponse({
    status: 200,
    description: 'Profile page has loaded',
    type: User,
  })
  @Render('profile')
  async getProfile(@Request() req) {
    if (this.wasEditPortfolio) {
      req.user.portfolio = await this.usersService.getUserPortfolio(req.user.id);
      this.wasEditPortfolio = false;
    }
    return {
      user: req.user,
      portfolio: req.user.portfolio,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/edit')
  @Render('edit')
  @ApiOperation({summary: 'Load edit Profile page'})
  @ApiResponse({
    status: 200,
    description: 'Index page has loaded',
    type: User,
  })
  editLoad(@Request() req){
    return {
      user: req.user,
      portfolio: req.user.portfolio,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/edit')
  @ApiOperation({summary: 'Edit profile Data'})
  @ApiResponse({
    status: 200,
    description: 'Successfully edit profile',
    type: User,
  })
  async editProfile(@Res() res: Response, @Request() req, @Body() portfolioDTO: PortfolioDto) {
    this.wasEditPortfolio = true;
    this.wasEditChat = true;
    await this.appService.editPortfolio(req.user, portfolioDTO);
    res.redirect('/edit');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  @ApiResponse({
    status: 200,
    description: 'Profile page has loaded',
    type: User,
  })
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('todoList')
  @ApiOperation({ summary: 'Load login page' })
  @ApiResponse({
    status: 200,
    description: 'TodoList page has loaded',
    type: User,
  })
  @Render('todoList')
  getTodoList(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('mock')
  @ApiOperation({ summary: 'Load mock page' })
  @ApiResponse({
    status: 200,
    description: 'Mock page has loaded',
    type: User,
  })
  @Render('mock')
  getMock(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('slider')
  @ApiOperation({ summary: 'Load slider page' })
  @ApiResponse({
    status: 200,
    description: 'Slider page has loaded',
    type: User,
  })
  @Render('slider')
  getSlider(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('chat')
  @ApiOperation({summary: 'Load chat page'})
  @ApiResponse({
    status: 200,
    description: 'Slider page has loaded',
    type: User,
  })
  @Render('chat')
  async getChat(@Request() req) {
    if (this.wasEditChat) {
      req.user.portfolio = await this.usersService.getUserPortfolio(req.user.id);
      this.wasEditChat = false;
    }
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/editImage')
  @ApiOperation({summary: 'Update profile picture'})
  @ApiResponse({
    status: 200,
    description: 'Profile picture was updated',
    type: User,
  })
  async createProfileImage(@Res() res: Response, @Request() req) {
    this.wasEditPortfolio = true;
    this.wasEditChat = true;
    res.redirect('/edit');
  }

}

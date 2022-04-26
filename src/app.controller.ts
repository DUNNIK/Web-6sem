import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseInterceptors, UploadedFile, UseGuards, UseFilters, Render, Res, ExecutionContext,
} from '@nestjs/common';

import { Response } from 'express';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./common/guards/jwt.guard";
import {UsersDTO} from "./users/dto/users.dto";
import {PortfolioService} from "./portfolio/portfolio.service";
import {AppService} from "./app.service";
import {PortfolioDto} from "./portfolio/dto/portfolio.dto";
import {UsersService} from "./users/users.service";
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import {Portfolio} from "./entities/portfolio.entity";
import {MessageDto} from "./chat/dto/message.dto";



@ApiBearerAuth()
@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  private wasEdit : Boolean = false;

  constructor(private readonly authService: AuthService, private readonly portfolioService: PortfolioService, private readonly appService: AppService, private readonly usersService: UsersService) {

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
    if (this.wasEdit) {
      req.user.portfolio = await this.usersService.getUserPortfolio(req.user.id);
      this.wasEdit = false;
    }
    return {
      user: req.user,
      portfolio: req.user.portfolio,
    };
  }


  @Get('/edit')
  @Render('edit')
  @ApiOperation({summary: 'Load edit Profile page'})
  @ApiResponse({
    status: 200,
    description: 'Index page has loaded',
    type: User,
  })
  editLoad(@Request() req): { message: string } {
    return { message: req.flash('editError') };
  }

  @Post('/edit')
  @ApiOperation({summary: 'Edit profile Data'})
  @ApiResponse({
    status: 200,
    description: 'Successfully edit profile',
    type: User,
  })
  async editProfile(@Res() res: Response, @Request() req, @Body() portfolioDTO: PortfolioDto) {
    this.wasEdit = true;
    await this.appService.editPortfolio(req.user, portfolioDTO);
    res.redirect('/edit');
  }

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
  @ApiOperation({ summary: 'Load chat page' })
  @ApiResponse({
    status: 200,
    description: 'Slider page has loaded',
    type: User,
  })
  @Render('chat')
  getChat(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
    };
  }

/*
  @UseGuards(AuthenticatedGuard)
  @Post('/chat')
  @ApiOperation({summary: 'Add message'})
  @ApiResponse({
    status: 200,
    description: 'Message eas added',
    type: User,
  })
  getMessage(@Request() req, @Body() text: string) {
    return {
      user: req.user,
      portfolio: req.user.portfolio,
      message: text,
    };
  }*/

}

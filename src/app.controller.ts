import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UsePipes,
  Query,
  Request,
  UseInterceptors, UploadedFile, UseGuards, UseFilters, Render, Res,
} from '@nestjs/common';

import { Response } from 'express';
import {FileInterceptor} from '@nestjs/platform-express';
import { extname, join } from 'path';
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
import {PortfolioController} from "./portfolio/portfolio.controller";
import {AppService} from "./app.service";
import {PortfolioDto} from "./portfolio/dto/portfolio.dto";

@ApiBearerAuth()
@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly authService: AuthService, private readonly portfolioService: PortfolioService, private readonly appService: AppService) { }

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
  register(@Res() res: Response, @Body() usersDTO: UsersDTO) {
    res.redirect('/');
    return this.authService.createUser(usersDTO, res)
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
  @ApiOperation({ summary: 'Load profile page' })
  @ApiResponse({
    status: 200,
    description: 'Profile page has loaded',
    type: User,
  })
  @Render('profile')
  getProfile(@Request() req) {
    return {
      user: req.user,
      portfolio: req.user.portfolio
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
  @ApiOperation({ summary: 'Edit profile Data' })
  @ApiResponse({
    status: 200,
    description: 'Successfully edit profile',
    type: User,
  })
  editProfile(@Res() res: Response, @Request() req, @Body() portfolioDTO : PortfolioDto) {
    return this.appService.editPortfolio(res, req.user, portfolioDTO)
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
}

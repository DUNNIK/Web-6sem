import {Controller, Get, Post, Request, Res, Render, UseGuards, Redirect, UseFilters} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('todoList')
  @Render('todoList')
  getTodoList(@Request() req) {
    return {user: req.user};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('mock')
  @Render('mock')
  getMock(@Request() req) {
    return {user: req.user};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('slider')
  @Render('slider')
  getSlider(@Request() req) {
    return {user: req.user};
  }
}

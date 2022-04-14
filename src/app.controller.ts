import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('todoList')
  @Render('todoList')
  getHello1() { }

  @Get('mock')
  @Render('mock')
  getHello2() { }

  @Get('slider')
  @Render('slider')
  getHello3() { }

  @Get('login')
  @Render('login')
  getHello4() { }
}

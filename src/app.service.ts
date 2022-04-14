import { Injectable } from '@nestjs/common';
import {UsersController} from "./users/users.controller";
import {UsersService} from "./users/users.service";

@Injectable()
export class AppService {

  constructor(private readonly usersService: UsersService) {}

  getHello(): object {
    return {name : "Nikitos"};
  }


}

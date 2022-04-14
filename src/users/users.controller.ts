import { UsersService } from './users.service';
import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {UsersDTO} from "./dto/users.dto";
import {validate} from "class-validator";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    async addUser(@Body() body, @Res() res) {
        let isOk = false;
        const user = new UsersDTO();
        user.id = body.id;
        user.email = body.email;
        user.password = body.password;

        await validate(user).then(errors => {
            if (errors.length > 0) {
                console.log(errors);
            } else {
                isOk = true;
            }
        });

        if (isOk) {
            const result = await this.userService.addUser(user);
            res.status(result.code).json(result.content);
        } else {
            res.status(400).json({ msg: 'Invalid request' });
        }
    }
}
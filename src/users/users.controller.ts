import { UsersService } from './users.service';
import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {UsersDTO} from "./dto/users.dto";
import {validate} from "class-validator";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../entities/user.entity";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get all users',
        type: User,
    })
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Add user' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async addUser(@Body() body, @Res() res): Promise<void> {
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
            await this.userService.addUser(user);
        } else {
            res.status(400).json({ msg: 'Invalid request' });
        }
    }
}
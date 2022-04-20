import { UsersService } from './users.service';
import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {UsersDTO} from "./dto/users.dto";
import {validate} from "class-validator";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../entities/user.entity";
import { v4 as uuidv4 } from 'uuid';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('/get')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Get all users',
        type: User,
    })
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/findOneByEmail')
    @ApiOperation({ summary: 'Find user by email' })
    @ApiResponse({
        status: 200,
        description: 'The found record by email',
        type: User,
    })
    findOneByEmail(@Param('email') email : string): Promise<User | undefined> {
        return this.userService.findByEmail(email);
    }

    @Post('/add')
    @ApiOperation({ summary: 'Add user' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async addUser(@Body() body, @Res() res): Promise<void> {
        let isOk = false;
        const userDTO = new UsersDTO();
        userDTO.id = uuidv4();
        userDTO.email = body.email;
        userDTO.pass = body.password;

        await validate(userDTO).then(errors => {
            if (errors.length > 0) {
                console.log(errors);
            } else {
                isOk = true;
            }
        });

        if (isOk) {
            await this.userService.addUser(userDTO);
        } else {
            res.status(400).json({ msg: 'Invalid request' });
        }
    }
}
import { UsersService } from './users.service';
import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../entities/user.entity";

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
        await this.userService.addUserByEmailAndPassword(body.email, body.password);
    }
}
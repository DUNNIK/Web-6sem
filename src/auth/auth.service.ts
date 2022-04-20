import {Injectable, Res} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {UsersDTO} from "../users/dto/users.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import {UsersController} from "../users/users.controller";
import {Response} from "express";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && user.pass === pass) {
            const { pass, ...result } = user;
            return result;
        }
        return null;
    }

    async createUser(user: any, @Res() res: Response): Promise<any> {
        const userDTO = new UsersDTO();
        userDTO.id = uuidv4();
        userDTO.email = user.email;
        userDTO.pass = user.password;
        await this.usersService.addUser(userDTO);
    }
}
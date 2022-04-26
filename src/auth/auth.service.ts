import {Injectable, Res} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {UsersDTO} from "../users/dto/users.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import {UsersController} from "../users/users.controller";
import {Response} from "express";
import {PortfolioDto} from "../portfolio/dto/portfolio.dto";
import {PortfolioService} from "../portfolio/portfolio.service";

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
            result.portfolio = await this.usersService.getUserPortfolio(user.id);
            return result;
        }
        return null;
    }

}
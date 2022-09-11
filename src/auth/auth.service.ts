import {Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
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
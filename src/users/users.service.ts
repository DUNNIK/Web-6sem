import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async getUsers(): Promise<Record<string, any>> {
        let isOk = true;
        const result = await this.usersRepository.find().catch(error => {
            isOk = false;
            console.log(error);
        });

        if (isOk) {
            return {code: 200, content: result};
        } else {
            return {code: 400, content: {msg: 'Invalid request'}};
        }
    }

    async addUser(user): Promise<Record<string, any>> {
        let isOk = true;
        const result = await this.usersRepository.save(user).catch(error => {
            isOk = false;
            console.log(error);
        });

        if (isOk) {
            return {code: 201, content: result};
        } else {
            return {code: 400, content: {msg: 'Invalid request'}};
        }
    }
}
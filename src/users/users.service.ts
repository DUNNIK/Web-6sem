import {User} from '../entities/user.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({email: email});
    }

    async addUser(user): Promise<void> {
        await this.usersRepository.save(user)
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
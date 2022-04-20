import {Portfolio} from '../entities/portfolio.entity';
import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersDTO} from "../users/dto/users.dto";

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio)
        private portfolioRepository: Repository<Portfolio>,
    ) {
    }

    findAll(): Promise<Portfolio[]> {
        return this.portfolioRepository.find();
    }

    findOne(id: string): Promise<Portfolio> {
        return this.portfolioRepository.findOne(id);
    }

    async addPortfolio(portfolio): Promise<void> {
        await this.portfolioRepository.save(portfolio)
    }

    async remove(id: string): Promise<void> {
        await this.portfolioRepository.delete(id);
    }
}
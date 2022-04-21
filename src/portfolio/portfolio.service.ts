import {Portfolio} from '../entities/portfolio.entity';
import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersDTO} from "../users/dto/users.dto";
import {User} from "../entities/user.entity";

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

    findOne(id: string): Promise<Portfolio | undefined> {
        return this.portfolioRepository.findOne({id : id});
    }

    async addPortfolio(portfolio, user): Promise<void> {
        let portfolioEntity = new Portfolio();
        portfolioEntity.user = user;
        portfolioEntity.githubLogin = portfolio.githubLogin;
        portfolioEntity.instagramLogin = portfolio.instagramLogin;
        portfolioEntity.telegramLogin = portfolio.telegramLogin;
        portfolioEntity.vkLogin = portfolio.vkLogin;
        portfolioEntity.name = portfolio.name;
        portfolioEntity.surname = portfolio.surname;

        await this.portfolioRepository.save(portfolioEntity)
    }

    async addPortfolioWithoutUser(portfolio): Promise<void> {
        await this.portfolioRepository.save(portfolio)
    }

    async updatePortfolio(portfolioNew): Promise<void> {
        await this.portfolioRepository.update(portfolioNew.id, portfolioNew);
    }

    async remove(id: string): Promise<void> {
        await this.portfolioRepository.delete(id);
    }
}
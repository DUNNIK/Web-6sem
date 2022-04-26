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

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async addPortfolio(portfolio, user): Promise<void> {
        let portfolioEntity = new Portfolio();
        portfolioEntity.user = user;

        if (portfolio.githubLogin) {
            portfolioEntity.githubLogin = portfolio.githubLogin;
        }
        if (portfolio.instagramLogin) {
            portfolioEntity.instagramLogin = portfolio.instagramLogin;
        }
        if (portfolio.telegramLogin) {
            portfolioEntity.telegramLogin = portfolio.telegramLogin;
        }
        if (portfolio.vkLogin) {
            portfolioEntity.vkLogin = portfolio.vkLogin;
        }
        if (portfolio.name) {
            portfolioEntity.name = portfolio.name;
        }
        if (portfolio.surname) {
            portfolioEntity.surname = portfolio.surname;
        }
        if (portfolio.profileImage) {
            portfolioEntity.profileImage = portfolio.profileImage;
        } else {
            portfolioEntity.profileImage = String(this.randomIntFromInterval(1, 15));
        }



        await this.portfolioRepository.save(portfolioEntity)
    }

    async addPortfolioWithoutUser(portfolio): Promise<void> {
        await this.portfolioRepository.save(portfolio)
    }

    async updatePortfolio(portfolioNew): Promise<void> {

        await this.portfolioRepository.update(portfolioNew.id, portfolioNew);
    }



    async updateOne(id: string, portfolio: any): Promise<Portfolio> {
        delete portfolio.name;

        await this.portfolioRepository.update(id, portfolio)
        return this.findOne(id);
    }

    async findProfile() {
        const profile = await this.portfolioRepository
            .createQueryBuilder("portfolio")
            .leftJoinAndSelect("portfolio.user", "user")
            .getOne();
        return profile;
    }

    async remove(id: string): Promise<void> {
        await this.portfolioRepository.delete(id);
    }
}
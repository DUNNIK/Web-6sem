import {Portfolio} from '../entities/portfolio.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

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
        return this.portfolioRepository.findOne({id: id});
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async addPortfolio(portfolio, user): Promise<void> {
        let portfolioEntity = this.fillPortfolio(portfolio, user);


        await this.portfolioRepository.save(portfolioEntity)
    }

    fillPortfolio(portfolioOld, user): Portfolio {
        let portfolioNew = new Portfolio();

        if (portfolioOld.githubLogin) {
            portfolioNew.githubLogin = portfolioOld.githubLogin;
        }
        if (portfolioOld.instagramLogin) {
            portfolioNew.instagramLogin = portfolioOld.instagramLogin;
        }
        if (portfolioOld.telegramLogin) {
            portfolioNew.telegramLogin = portfolioOld.telegramLogin;
        }
        if (portfolioOld.vkLogin) {
            portfolioNew.vkLogin = portfolioOld.vkLogin;
        }
        if (portfolioOld.name) {
            portfolioNew.name = portfolioOld.name;
        }
        if (portfolioOld.surname) {
            portfolioNew.surname = portfolioOld.surname;
        }
        if (portfolioOld.profileImage) {
            portfolioNew.profileImage = portfolioOld.profileImage;
        } else {
            portfolioNew.profileImage = String(this.randomIntFromInterval(1, 49)) + '.png';
        }
        if (user) {
            portfolioNew.user = user;
        }

        return portfolioNew;
    }
    async updatePortfolio(id, portfolioNew): Promise<void> {

        await this.portfolioRepository.update(id, portfolioNew);
    }
    async remove(id: string): Promise<void> {
        await this.portfolioRepository.delete(id);
    }
}
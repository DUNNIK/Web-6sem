import {Portfolio} from '../entities/portfolio.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PortfolioDto} from "./dto/portfolio.dto";

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
        let portfolioEntity = new Portfolio();
        portfolioEntity.user = user;

        this.fillPortfolio(portfolio, portfolioEntity);


        await this.portfolioRepository.save(portfolioEntity)
    }

    fillPortfolio(portfolioOld, portfolioNew) {
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
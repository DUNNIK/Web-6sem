import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "./users/users.service";
import {PortfolioService} from "./portfolio/portfolio.service";
import {UsersDTO} from "./users/dto/users.dto";
import {PortfolioDto} from "./portfolio/dto/portfolio.dto";

@Injectable()
export class AppService {

    constructor(private readonly usersService: UsersService, private readonly portfolioService: PortfolioService) {
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async editPortfolio(user: any, portfolio: any) {
        const portfolioDto = new PortfolioDto();

        this.portfolioService.fillPortfolio(portfolio, portfolioDto);

        const userFind = await this.usersService.findOne(user.id);

        let portfolioF;
        if (userFind) {
            portfolioF = await this.usersService.getUserPortfolio(userFind.id);
        }

        let portfolioFind;
        if (portfolioF) {
            portfolioFind = await this.portfolioService.findOne(portfolioF.id);
        }

        if (portfolioFind) {
            portfolioDto.id = portfolioF.id;
            await this.portfolioService.updatePortfolio(portfolioDto)
        } else {
            await this.portfolioService.addPortfolio(portfolioDto, userFind);
        }


    }

    async createUser(user: any): Promise<any> {

        const userFind = await this.usersService.findByEmail(user.email);


        if (userFind) {
            throw new UnauthorizedException(400, "The user has already been registered")
        }
        const userDTO = new UsersDTO();
        userDTO.email = user.email;
        userDTO.pass = user.password;
        const portfolioDTO = new PortfolioDto();
        await this.usersService.addUser(userDTO);
        await this.portfolioService.addPortfolio(portfolioDTO, userDTO)
    }

}

import { IsNumber, IsString } from 'class-validator';
import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portfolio} from "../../entities/portfolio.entity";

export class PortfolioDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    vkLogin: string;

    @IsString()
    instagramLogin: string;

    @IsString()
    telegramLogin: string;

    @IsString()
    githubLogin: string;

    @IsString()
    profileImage: string;
}
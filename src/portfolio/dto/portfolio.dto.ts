import { IsString } from 'class-validator';

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
import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PortfolioDto {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'name',
        description: 'name of user portfolio'
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'surname',
        description: 'surname of user portfolio'
    })
    @IsString()
    surname: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'vkLogin',
        description: 'vk login of user portfolio'
    })
    @IsString()
    vkLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'instagramLogin',
        description: 'instagram login of user portfolio'
    })
    @IsString()
    instagramLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'telegramLogin',
        description: 'telegram login of user portfolio'
    })
    @IsString()
    telegramLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'githubLogin',
        description: 'github login of user portfolio'
    })
    @IsString()
    githubLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'profileImage',
        description: 'filename of image of user portfolio'
    })
    @IsString()
    profileImage: string;
}
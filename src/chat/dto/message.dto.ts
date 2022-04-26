import { IsString } from 'class-validator';

export class MessageDto {
    @IsString()
    name: string;

    @IsString()
    text: string;
}
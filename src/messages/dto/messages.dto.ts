import { IsString } from 'class-validator';

export class MessagesDto {
    @IsString()
    id: string;
    @IsString()
    text: string;
    @IsString()
    name: string;
    @IsString()
    image: string;
}
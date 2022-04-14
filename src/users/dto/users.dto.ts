import { IsNumber, IsString } from 'class-validator';

export class UsersDTO {
    @IsString()
    id: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
}
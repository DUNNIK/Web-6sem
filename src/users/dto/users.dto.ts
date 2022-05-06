import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UsersDTO {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'email',
        description: 'email of user'
    })
    @IsString()
    email: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'password',
        description: 'password of user'
    })
    @IsString()
    pass: string;
}
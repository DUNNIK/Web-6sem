import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class MessagesDto {


    @ApiProperty({
        required: true,
        type: 'string',
        name: 'text',
        description: 'text of message'
    })
    @IsString()
    text: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'name',
        description: 'name of user in message'
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'profileImage',
        description: 'filename of user image in message'
    })
    @IsString()
    image: string;
}
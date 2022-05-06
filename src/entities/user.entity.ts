import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Portfolio} from "./portfolio.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('users')
export class User {
    @ApiProperty({
        required: true,
        type: 'string',
        name: 'id',
        description: 'id of user'
    })
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'email',
        description: 'email of user'
    })
    @Column()
    email: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'password',
        description: 'password of user'
    })
    @Column()
    pass: string;

    @ApiProperty({
        required: true,
        type: 'Portfolio',
        name: 'portfolio',
        description: 'portfolio of user'
    })
    @OneToOne( type => Portfolio , portfolio => portfolio.user)
    portfolio: Portfolio;

}
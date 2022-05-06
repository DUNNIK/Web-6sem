import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('portfolio')
export class Portfolio{
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'name',
        description: 'name of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'Иван' })
    name: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'surname',
        description: 'surname of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'Иванов' })
    surname: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'vkLogin',
        description: 'vk login of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'default' })
    vkLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'instagramLogin',
        description: 'instagram login of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'default' })
    instagramLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'telegramLogin',
        description: 'telegram login of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'default' })
    telegramLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'githubLogin',
        description: 'github login of user portfolio'
    })
    @Column({ nullable: false, type: "varchar", default: 'default' })
    githubLogin: string;

    @ApiProperty({
        required: true,
        type: 'string',
        name: 'profileImage',
        description: 'filename of image of user portfolio'
    })
    @Column({nullable: true})
    profileImage: string;

    @ApiProperty({
        required: true,
        type: 'User',
        name: 'user',
        description: 'user entity of user portfolio'
    })
    @OneToOne(type => User, user => user.portfolio)
    @JoinColumn()
    user: User;
}
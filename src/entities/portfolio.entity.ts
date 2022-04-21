import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity('portfolio')
export class Portfolio{
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    vkLogin: string;

    @Column()
    instagramLogin: string;

    @Column()
    telegramLogin: string;

    @Column()
    githubLogin: string;

    @OneToOne(type => User, user => user.portfolio)
    user: User;
}
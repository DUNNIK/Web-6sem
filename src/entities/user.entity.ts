import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Portfolio} from "./portfolio.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    email: string;

    @Column()
    pass: string;

    @OneToOne( type => Portfolio , portfolio => portfolio.user)
    portfolio: Portfolio;

}
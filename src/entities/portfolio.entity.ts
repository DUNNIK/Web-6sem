import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity('portfolio')
export class Portfolio{
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false, type: "varchar", default: 'Иван' })
    name: string;

    @Column({ nullable: false, type: "varchar", default: 'Иванов' })
    surname: string;

    @Column({ nullable: false, type: "varchar", default: 'default' })
    vkLogin: string;

    @Column({ nullable: false, type: "varchar", default: 'default' })
    instagramLogin: string;

    @Column({ nullable: false, type: "varchar", default: 'default' })
    telegramLogin: string;

    @Column({ nullable: false, type: "varchar", default: 'default' })
    githubLogin: string;

    @Column({nullable: true})
    profileImage: string;

    @OneToOne(type => User, user => user.portfolio)
    @JoinColumn()
    user: User;
}
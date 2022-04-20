import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    email: string;

    @Column()
    pass: string;

}
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Messages')
export class Message {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    text: string;

    @Column()
    name: string;

    @Column()
    image: string;
}
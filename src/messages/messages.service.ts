import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Message} from "../entities/message.entity";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {
    }

    async findAll(): Promise<Message[]> {
        return await this.messageRepository.find({select: ["name", "text", "image"]});
    }

    findOne( id: string): Promise<Message> {
        return this.messageRepository.findOne(id);
    }

    async addMessage(message): Promise<void> {
        await this.messageRepository.save(message)
    }


    async remove(id: string): Promise<void> {
        await this.messageRepository.delete(id);
    }

}
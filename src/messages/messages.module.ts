import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {Message} from "../entities/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {MessagesService} from "../messages/messages.service";
import {MessagesDto} from "../messages/dto/messages.dto";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messagesService: MessagesService) {
    }

    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('ChatGateway');

    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: any) {
        this.server.emit('msgToClient', payload);
        await this.addMessageToStorage(payload);
    }

    @SubscribeMessage('msgHistory')
    async handleHistory(client: Socket) {
        let allMessages = await this.messagesService.findAll();
        this.server.emit('msgHistory', allMessages);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    async addMessageToStorage(payload: any) {
        let message = new MessagesDto();
        message.name = payload.name;
        message.text = payload.text;
        message.image = payload.image;
        await this.messagesService.addMessage(message);
    }
}


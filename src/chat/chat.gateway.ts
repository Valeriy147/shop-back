import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { AddMessageDto } from './dto/add-message.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly messageService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleChatMessage(@MessageBody() addMessageDto: AddMessageDto) {
    await this.messageService.createMessage(addMessageDto);
    this.server.emit('message', addMessageDto);
  }
}
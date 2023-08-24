import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AddMessageDto } from './dto/add-message.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly messageService: ChatService) {}

  @Post()
  async createMessage(
    @Body() addMessageDto: AddMessageDto,
  ) {
    return this.messageService.createMessage(addMessageDto);
  }

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Delete()
  async deleteAllMessages() {
    return this.messageService.deleteAllMessages();
  }
}
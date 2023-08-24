import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'src/schemas/chat.schema';
import { CHAT_REPOSITORY } from './constants/chat.constants';
import { AddMessageDto } from './dto/add-message.dto';

@Injectable()
export class ChatService {
  constructor(
        @Inject(CHAT_REPOSITORY) private readonly chatRepository: typeof Message,
  ) {}

  async createMessage(addMessageDto: AddMessageDto): Promise<Message> {
    return this.chatRepository.create(addMessageDto);
  }

  async getAllMessages(): Promise<Message[]> {
    return this.chatRepository.findAll();
  }

  async deleteAllMessages() {
    return this.chatRepository.destroy({ where: {} });
  }
}
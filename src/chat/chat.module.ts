import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatProviders } from './providers/chat.providers';


@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ...ChatProviders],
})
export class ChatModule {}
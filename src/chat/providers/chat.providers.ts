import { Message } from 'src/schemas/chat.schema';
import { CHAT_REPOSITORY } from '../constants/chat.constants';

export const ChatProviders = [
  {
    provide: CHAT_REPOSITORY,
    useValue: Message,
  },
];

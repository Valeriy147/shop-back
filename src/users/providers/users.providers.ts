import { User } from 'src/schemas/user.schema';
import { USERS_REPOSITORY } from '../constants/users.constants';

export const UsersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];

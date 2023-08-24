import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { Product } from './schemas/product.schema';
import { User } from './schemas/user.schema';
import { Message } from './schemas/chat.schema';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        // dialectOptions: {
        //   "ssl": {
        //     "require": true,
        //     "rejectUnauthorized": false
        //   }
        // },
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Vgk990731',
        database: 'postgres',
        // ssl: false,
      });
      sequelize.addModels([
        User,
        Product,
        Message,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];


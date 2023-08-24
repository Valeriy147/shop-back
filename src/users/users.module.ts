import { UsersProviders } from './providers/users.providers';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ProductsService } from 'src/products/services/products.service';
import { ProductsModule } from 'src/products/products.module';


@Module({
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
  imports: [ProductsModule]
})
export class UsersModule { }

import { ProductsProviders } from './providers/products.providers';
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductsProviders],
  imports: [FilesModule],
  exports: [ProductsService]
})
export class ProductsModule { }

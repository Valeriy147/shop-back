import { databaseProviders } from './database.providers';
import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ChatModule } from './chat/chat.module';

@Module({
    controllers: [],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.development.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve('src/static'),
        }),
        AuthModule,
        ProductsModule,
        FilesModule,
        ChatModule
    ],
})
export class AppModule { }
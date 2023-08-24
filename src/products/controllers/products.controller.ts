import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';

@Controller('api/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post('/image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile() image
    ) {
        return await this.productsService.uploadImage(image);
    }

    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
    ) {
        return await this.productsService.createProduct(createProductDto);
    }

    @Get()
    async getAll() {
        return await this.productsService.getAllProducts();
    }

    @Get('/:productId')
    async getProductById(@Param('productId') productId: number) {
        return await this.productsService.getProductById(productId)
    }

    @Put('/:productId')
    async updateProduct(
        @Param('productId') productId: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productsService.updateProduct(updateProductDto);
    }

    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: number) {
        return await this.productsService.deleteProduct(productId);
    }
}

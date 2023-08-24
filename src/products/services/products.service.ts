import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Product } from '../../schemas/product.schema';
import { PRODUCTS_REPOSITORY } from '../constants/products.constants';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { FilesService } from 'src/files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCTS_REPOSITORY) private readonly productsRepository: typeof Product,
        private filesService: FilesService
    ) { }

    async uploadImage(
        image: any
    ): Promise<any> {
        const fileName = await this.filesService.createFile(image)
        return { fileName: fileName }
    }

    async createProduct(
        createProductDto: CreateProductDto,
    ): Promise<Product> {
        const newProduct = await this.productsRepository.create(createProductDto);

        if (!newProduct) {
            throw new HttpException('Could not create', HttpStatus.BAD_REQUEST)
        }
        return await this.productsRepository.findOne({
            where: { id: newProduct.id },
        });
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        }

        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productsRepository.findAll({
            attributes: ['id', 'name', 'price', 'image', 'description', 'createdAt', 'updatedAt', 'category']
        });

        if (!products[0]) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        }

        return products;
    }

    async updateProduct(
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        const id: number = updateProductDto.id;
        const isProductUpdate = await this.productsRepository.update(updateProductDto, {
            where: { id },
        });

        if (!isProductUpdate[0]) {
            throw new HttpException('Could not update', HttpStatus.BAD_REQUEST)

        }

        const product: Product = await this.productsRepository.findOne({
            where: { id },
        });

        return product;
    }



    async deleteProduct(productId: number): Promise<object> {
        const product: Product = await this.productsRepository.findOne({
            where: { id: productId },
        });

        await product.destroy().catch(() => {
            throw new HttpException('Could not delete', HttpStatus.BAD_REQUEST)

        });
        return { message: 'Deleted successfully' };
    }
    
    async findProductsByIds(ids: number[]): Promise<Product[]> {
        if(!ids){
            return []
        } else {
            return this.productsRepository.findAll({
                where: {
                  id: {
                      [Op.in]: ids?.map(id => id)
                  },
                },
              });
            }
        }

}

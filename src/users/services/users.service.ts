import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { USERS_REPOSITORY } from '../constants/users.constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../schemas/user.schema';
import { ProductsService } from 'src/products/services/products.service';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: typeof User,
    private readonly productsService: ProductsService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = await this.userRepository.create<User>(createUserDto);

    if (!newUser) {
      throw new HttpException('Could not create', HttpStatus.BAD_REQUEST)

    }

    return newUser;
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne<User>({
      where: { email },
    });

    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne<User>({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return user;
  }

  async editUserProfile(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const isUserUpdated = await this.userRepository.update(updateUserDto, {
      where: { id },
    });

    return await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async addUserProduct(userId: number, productId: number): Promise<Product> {
    const user: User = await this.findUserById(userId);

    if (!user.products) {
      user.products = [];
    }
    user.products.push(+productId);
    const updatedValues = { products: user.products };
    const updateOptions = {
      where: { id: userId }
    };

    const [rowsAffected] = await this.userRepository.update(updatedValues, updateOptions);

    const product = await this.productsService.getProductById(productId);
    return product;
  }

  async getUserProducts(userId: number): Promise<Product[]> {
    const user = await this.findUserById(userId);
    const products = await this.productsService.findProductsByIds(user.products);

    return products;
  }
}

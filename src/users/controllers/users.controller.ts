import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';


@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/:userId')
  async get(
    @Param('userId') userId: number
  ) {
    return await this.usersService.findUserById(userId);
  }

  @Put('/:userId')
  async editProfile(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.editUserProfile(userId, updateUserDto);
  }

  @Post('/:userId/products/:productId')
  async addUserProduct(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.usersService.addUserProduct(userId, productId);
  }

  @Get('/:userId/products')
  async getUserProducts(@Param('userId') userId: number) {
    return this.usersService.getUserProducts(userId);
  }
}

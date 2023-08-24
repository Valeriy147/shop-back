import { LoginUserDto } from './../dto/login-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from '../services/auth.service';


@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/signup')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto)
    }
}

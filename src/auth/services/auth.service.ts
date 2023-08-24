import { LoginUserDto } from './../dto/login-user.dto';
import { User } from './../../schemas/user.schema';
import { UsersService } from './../../users/services/users.service';
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable, from, lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'



@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async signUp(userDto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmailWithPassword(userDto.email);
        if (candidate) {
            throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
        return this.generateToken(user)

    }

    private async generateToken(user: User) {
        const payload = { email: user.email, name: user.name, id: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.usersService.findUserByEmailWithPassword(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Wrong email or password' })
    }
}

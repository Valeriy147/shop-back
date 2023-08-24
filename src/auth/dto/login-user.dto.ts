import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}

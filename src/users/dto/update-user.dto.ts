import { IsNotEmpty, IsNumber, IsString, IsEmail } from "class-validator";

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

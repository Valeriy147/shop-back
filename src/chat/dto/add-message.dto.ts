import { IsNotEmpty } from 'class-validator';

export class AddMessageDto {

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly message: string;
}

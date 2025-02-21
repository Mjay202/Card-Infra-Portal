import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
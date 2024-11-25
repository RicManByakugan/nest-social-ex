import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

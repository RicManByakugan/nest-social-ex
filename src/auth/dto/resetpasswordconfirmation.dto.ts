import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordConfirmationDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

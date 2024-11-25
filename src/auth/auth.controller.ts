import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/siginin.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { ResetPasswordConfirmationDto } from './dto/resetpasswordconfirmation.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto
  ) {
    return this.authService.resetPassword(body);
  }

  @Post('reset-passwod-confirmation')
  async testCode(
    @Body() data: ResetPasswordConfirmationDto
  ) {
    return this.authService.resetPasswordConfirmation(data);
  }
}

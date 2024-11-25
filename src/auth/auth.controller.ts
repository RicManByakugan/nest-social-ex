import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/siginin.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { ResetPasswordConfirmationDto } from './dto/resetpasswordconfirmation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/deleteaccount.dto';

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
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @Post('reset-passwod-confirmation')
  async testCode(@Body() data: ResetPasswordConfirmationDto) {
    return this.authService.resetPasswordConfirmation(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-account')
  async deleteAccount(
    @Req() request: Request,
    @Body() body: DeleteAccountDto,
  ) {
    return this.authService.deleteAccount(request.user["id"], body);
  }
}

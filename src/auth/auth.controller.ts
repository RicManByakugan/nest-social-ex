import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/siginin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post("signup")
    async signup(
        @Body() body: SignUpDto
    ){
        return this.authService.signUp(body);
    }

    @Post("signin")
    async signin(
        @Body() body: SignInDto
    ){
        return this.authService.signIn(body);
    }
}

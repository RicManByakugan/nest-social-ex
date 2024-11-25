import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post("signup")
    async sign(
        @Body() body: SignUpDto
    ){
        return this.authService.signUp(body);
    }
}

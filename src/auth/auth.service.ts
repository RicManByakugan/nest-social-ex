import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { MailerService } from 'src/mailer/mailer.service';
import { SignInDto } from './dto/siginin.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { ResetPasswordConfirmationDto } from './dto/resetpasswordconfirmation.dto';
import { DeleteAccountDto } from './dto/deleteaccount.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    // Vérifier si utilisateur déjà inscrit
    const { email, password, username } = data;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (user) throw new ConflictException('Email already in use');
    // Hasher mot de passe
    const hash = await bcrypt.hash(password, 10);
    // Créer utilisateur
    await this.prismaService.user.create({
      data: { username, email, password: hash },
    });
    // Email
    await this.mailerService.sendSignUpConfirmation(email);
    // Reponse
    return { message: 'User created successfully' };
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;
    // Vérifier si utilisateur existe
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new ConflictException('User not found');
    // Vérifier si mot de passe correspond
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    // Générer token
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
    // Reponse
    return { token, user };
  }

  async resetPassword(email: ResetPasswordDto) {
    // Vérifier si utilisateur existe
    const user = await this.prismaService.user.findUnique({
      where: { email: email.email },
    });
    if (!user) throw new ConflictException('User not found');
    // Generate code
    const code = speakeasy.totp({
      secret: process.env.TOTP_SECRET,
      digits:  5,
      step: 60 * 15,
      encoding: 'base32',
    })
    // Reponse
    const url = "http://localhost:3000/auth/code-validation";

    //Email
    await this.mailerService.sendResetPassword(email.email, url, code);
    return { message: 'Code sent' };
  }

  async resetPasswordConfirmation(data: ResetPasswordConfirmationDto){
    const { code, password, email } = data;
    // Vérifier si utilisateur existe
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new ConflictException('User not found');
    // Vérifier si code est correct
    const match = speakeasy.totp.verify({
      secret: process.env.TOTP_SECRET,
      token: code,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    })
    if (!match) throw new UnauthorizedException('Invalid/expired code');
    // Hasher mot de passe
    const hash = await bcrypt.hash(password, 10);
    // Mettre à jour mot de passe
    await this.prismaService.user.update({
      where: { email },
      data: { password: hash },
    });
    // Reponse
    return { message: 'Password updated successfully' };
  }

  async deleteAccount(id: any, deleteaccountdto: DeleteAccountDto){
    // Vérifier si utilisateur existe
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new ConflictException('User not found');

    // Vérifier si mot de passe correspond
    const match = await bcrypt.compare(deleteaccountdto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // Supprimer utilisateur
    await this.prismaService.user.delete({
      where: { id },
    });
    // Reponse
    return { message: 'Account deleted successfully' };
  }
}

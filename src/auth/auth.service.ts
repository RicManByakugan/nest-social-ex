import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { SignInDto } from './dto/siginin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
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
    })
    if (user) throw new ConflictException('User not found');
    // Vérifier si mot de passe correspond
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    // Générer token
    
    // Reponse
  }
}

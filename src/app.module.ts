import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtStrategy } from './auth/strategy/strategy.service';

@Module({
  imports: [AuthModule, PrismaModule, MailerModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [AuthModule, PrismaModule, MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

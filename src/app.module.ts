import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtStrategy } from './auth/strategy/strategy.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, PrismaModule, MailerModule, PostModule, CommentModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}

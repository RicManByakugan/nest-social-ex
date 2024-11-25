import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto/createpost.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: createPostDto, userId: any) {
    const { title, body } = data
    await this.prismaService.post.create({
        data: { 
            body,
            title,
            userId
        }
    })
    return { data: "Post created" };
  }
}

import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto/createpost.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updatePostDto } from './dto/updatepost.dto';
import { updatePatchPostDto } from './dto/updatepostpuych.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: createPostDto, userId: any) {
    const { title, body } = data;
    await this.prismaService.post.create({
      data: {
        body,
        title,
        userId,
      },
    });
    return { data: 'Post created' };
  }

  async findAll() {
    return await this.prismaService.post.findMany({
      include: {
        // user: true,
        user: {
          select: {
            username: true,
            email: true,
            password: false,
          },
        },
        comments: true,
      },
    });
  }

  async findById(postId: number) {
    return await this.prismaService.post.findUnique({
      where: { postId },
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async findByUser(user: any) {
    return await this.prismaService.post.findMany({
      where: { userId: user },
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async updatePost(postId: number, body: updatePostDto, user: any) {
    const post = await this.prismaService.post.findUnique({
      where: { postId },
    });
    if (post.userId !== user) {
      return { data: 'You are not authorized to update this post' };
    }

    await this.prismaService.post.update({
      where: { postId },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return { data: 'Post updated' };
  }

  async updatePostPath(postId: number, bodyDto: updatePatchPostDto, user: any) {
    const { title, body } = bodyDto;
    const post = await this.prismaService.post.findUnique({
      where: { postId },
    });
    if (post.userId !== user) {
      return { data: 'You are not authorized to update this post' };
    }

    await this.prismaService.post.update({
      where: { postId },
      data: {
        title,
        body,
      },
    });
    return { data: 'Post updated' };
  }

  async deletePost(postId: number, user: any) {
    const post = await this.prismaService.post.findUnique({
      where: { postId },
    });
    if (post.userId !== user) {
      return { data: 'You are not authorized to delete this post' };
    }
    await this.prismaService.post.delete({
      where: { postId },
    });
    return { data: 'Post deleted' };
  }
}

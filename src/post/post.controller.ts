import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/createpost.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    async create(
        @Body() body: createPostDto,
        @Req() request: Request
    ){
        const user = request.user["id"]
        return await this.postService.create(body, user);
    }
}

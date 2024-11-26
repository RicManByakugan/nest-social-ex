import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/createpost.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { updatePostDto } from './dto/updatepost.dto';
import { updatePatchPostDto } from './dto/updatepostpuych.dto';

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

    @Get("getall")
    async findAll(){
        return await this.postService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("getbyid/:userId")
    async findByPostId(@Param('userId') userId: string){
        return await this.postService.findById(Number(userId));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("getbyuser")
    async findByUser(@Req() request: Request){
        const user = request.user["id"]
        return await this.postService.findByUser(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:postId")
    async deletePost(
        @Param('postId') postId: string,
        @Req() request: Request
    ){
        const user = request.user["id"]
        return await this.postService.deletePost(Number(postId), user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("update/:postId")
    async updatePost(
        @Param('postId') postId: string,
        @Body() body: updatePostDto,
        @Req() request: Request
    ){
        const user = request.user["id"]
        return await this.postService.updatePost(Number(postId), body, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('patch/:postId')
    async updatePostPath(
        @Param('postId') postId: string,
        @Body() body: updatePatchPostDto,
        @Req() request: Request
    ){
        const user = request.user["id"]
        return await this.postService.updatePostPath(Number(postId), body, user);
    }
}

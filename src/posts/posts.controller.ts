import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Put('/posts/:id')
  updatePost(@Param('id') id: string, @Body() body: CreatePostDto) {
    try {
      return this.postsService.update(body, Number(id));
    } catch (error) {
      throw new NotFoundException;
    }
  }
}

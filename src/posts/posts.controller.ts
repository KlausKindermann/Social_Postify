import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, NotFoundException, BadRequestException, ForbiddenException, HttpException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postsService.create(createPostDto);
    } catch (error) {
      throw new BadRequestException
    }
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.postsService.remove(+id);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new NotFoundException
      }
      if (error.message === 'FORBIDDEN') {
        throw new ForbiddenException
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreatePostDto) {
    try {
      return this.postsService.update(body, Number(id));
    } catch (error) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }
}

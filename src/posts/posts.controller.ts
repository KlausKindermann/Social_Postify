import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new post for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Post has been created" })
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'It retrieves all posts' })
  @ApiResponse({ status: HttpStatus.OK, description: "Posts retrieved" })
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a specific post' })
  @ApiResponse({ status: HttpStatus.OK, description: "Post retrieved" })
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific post' })
  @ApiResponse({ status: HttpStatus.OK, description: "Post updated" })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific post' })
  @ApiResponse({ status: HttpStatus.OK, description: "Post deleted" })
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(+id);
  }
}

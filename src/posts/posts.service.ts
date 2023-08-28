import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) { }


  async create(post: CreatePostDto) {
    return  await this.postRepository.create(post);
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    if (posts) {
      return posts;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

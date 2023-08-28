import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) { }


  async create(post: CreatePostDto) {
    return await this.postRepository.create(post);
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    if (posts) {
      return posts;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const media = await this.postRepository.findOne(id);
    if (!media) {
      throw new NotFoundException('NOT FOUND');
    } else {
      return media;
    }
  }

  async remove(id: number) {
    const exists = await this.postRepository.findPublicationById(id);
    if (exists) {
      const del = this.postRepository.remove(id);
      if (del) {
        return del;
      } else {
        throw new NotFoundException('NOT FOUND');
      }
    } else {
      throw new ForbiddenException('FORBIDDEN');
    }
  }

  async update(post: CreatePostDto, id: number) {
    const update = this.postRepository.update(id, post);
    if (update) {
      return update;
    } else {
      throw new NotFoundException('NOT FOUND');
    }
  }
}

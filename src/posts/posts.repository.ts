
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) { }

  async create(post: CreatePostDto) {
    return await this.prisma.posts.create({ data: post });
  }

  async findAll() {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.posts.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.posts.delete({ where: { id } });
  }

  async update(id: number, post: CreatePostDto) {
   /* return await this.prisma.posts.upsert({
      where: {
        id,
      },
      update: {
        text: post.text,
      },
    });*/
  }
}



import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: CreatePostDto) {
    return await this.prisma.posts.create({ data: post });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  async getPostById(id: number) {
    return await this.prisma.posts.findUnique({ where: { id } });
  }
}

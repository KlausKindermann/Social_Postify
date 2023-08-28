
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) { }

  create(post: CreatePostDto) {
    return this.prisma.posts.create({ data: post });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.posts.delete({ where: { id } });
  }

  update(id: number, createPostDto: CreatePostDto) {
    return this.prisma.posts.upsert({
      where: {
        id,
      },
      update: {
        text: createPostDto.text,
      },
      create: createPostDto
    });
  }

  findPublicationById(id: number) {
    return this.prisma.publications.findFirst({ where: { postId: id } });
  }
}


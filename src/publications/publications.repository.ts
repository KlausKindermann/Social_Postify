
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private prisma: PrismaService) { }

  create(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publications.create({ data: createPublicationDto });
  }
  findAll() {
    return this.prisma.publications.findMany();
  }
  findOne(id: number): Promise<CreatePublicationDto> {
    return this.prisma.publications.findUnique({ where: { id } });
  }
  deletePublication(id: number) {
    return this.prisma.publications.delete({ where: { id } });
  }

  update(id: number, publication: CreatePublicationDto) {
   /* return this.prisma.publications.upsert({
      where: {
        id,
      },
      update: {
        data: { publication },
      },
    });*/
  }

  findPostById(id: number) {
    return this.prisma.posts.findUnique({ where: { id } });
  }

  findMediaById(id: number) {
    return this.prisma.media.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.publications.delete({ where: { id } });
  }
}

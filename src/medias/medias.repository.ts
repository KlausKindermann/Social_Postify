import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  create(body: CreateMediaDto) {
    return this.prisma.media.create({
      data: body
    })
  }

  findAll() {
    return this.prisma.media.findMany();
  }

  findOne(id: number) {
    return this.prisma.media.findFirst({
      where: { id }
    });
  }

  update(body: CreateMediaDto, id: number) {
    /*return this.prisma.media.upsert({
      where: { id },
      update: {
        username: media.username,
      },
  })*/
}

remove(id: number) {
  return this.prisma.media.delete({
    where: { id }
  });
}

}

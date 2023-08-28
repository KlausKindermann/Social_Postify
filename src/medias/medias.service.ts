import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {
  }

  async create(body: CreateMediaDto) {
    const { title, username } = body;
    if (!title || !username) throw new BadRequestException;
    return await this.repository.create(body);
  }

  async findAll() {
    const medias = await this.repository.findAll()
    if (!medias) {
      return []
    } else {
      return medias;
    }
  }

  async findOne(id: number) {
    const mediaId = await this.repository.findOne(id);
    if (!mediaId) throw new NotFoundException;
    return mediaId;
  }

  async update(body: CreateMediaDto, id: number) {
    if (body.title === body.username) {
      throw new ConflictException('CONFLICT');
    } else {
      const midia = this.repository.findOne(id);
      if (midia) {
        return this.repository.update(body, id);
      } else {
        throw new NotFoundException;
      }
    }
  }

  async remove(id: number) {
    const mediaId = await this.repository.remove(id);
    if (!mediaId) throw new NotFoundException;
    return mediaId;
  }
}

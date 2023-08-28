import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {
  }

  async create(body: CreateMediaDto) {
    const { tittle, username } = body;
    if (!tittle || !username) throw new BadRequestException;
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

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  async remove(id: number) {
    const mediaId = await this.repository.remove(id);
    if (!mediaId) throw new NotFoundException;
    return mediaId;
  }
}

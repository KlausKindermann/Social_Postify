import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsRepository } from './publications.repository';
import dayjs from 'dayjs';

@Injectable()
export class PublicationsService {
  constructor(private publicationRepository: PublicationsRepository) { }

  create(createPublicationDto: CreatePublicationDto) {
    const media = this.publicationRepository.findMediaById(createPublicationDto.mediaId);
    const post = this.publicationRepository.findPostById(createPublicationDto.postId);
    if (!media || !post) {
      throw new NotFoundException
    }
  }

  findAll() {
    const publications = this.publicationRepository.findAll();
    if (publications) {
      return publications;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    const publication = this.publicationRepository.findOne(id);
    if (publication) {
      return publication;
    } else {
      throw new NotFoundException
    }
  }

  async update(publication: CreatePublicationDto, id: number) {
    const media = this.publicationRepository.findMediaById(publication.mediaId);
    const post = this.publicationRepository.findPostById(publication.postId);
    if (!media || !post) {
      throw new NotFoundException('NOT FOUND');
    } else {
      const publication = await this.publicationRepository.findOne(id);
      if (publication) {
        const now = dayjs().toDate().getTime();
        const timestamp = dayjs(publication.date).toDate().getTime();
        if (now < timestamp) {
          return this.publicationRepository.update(id, publication);
        } else {
          throw new ForbiddenException('FORBIDDEN');
        }
      } else {
        throw new NotFoundException('NOT FOUND');
      }
    }
  }

  remove(id: number) {
    const publication = this.publicationRepository.findOne(id);
    if (publication) {
      return this.publicationRepository.remove(id);
    } else {
      throw new NotFoundException('NOT FOUND');
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, NotFoundException, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      return await this.publicationsService.create(createPublicationDto);
    } catch (error) {
      throw new NotFoundException('NOT FOUND');
    }
  }

  @Get()
  async findAll() {
    return await this.publicationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.publicationsService.findOne(+id);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new NotFoundException('NOT FOUND');
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.publicationsService.remove(+id);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new NotFoundException('NOT FOUND');
      }
    }
  }

  @Put('/posts/:id')
  async update(@Param('id') id: string, @Body() createPublicationDto: CreatePublicationDto) {
    try {
      return await this.publicationsService.update(createPublicationDto, Number(id));
    } catch (error) {
      throw new NotFoundException;
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, ConflictException, NotFoundException, ForbiddenException, HttpException } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    try {
      return await this.mediasService.create(createMediaDto);
    } catch (error) {
      throw new ConflictException
    }
  }

  @Get()
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mediasService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() CreateMediaDto: CreateMediaDto) {
    return await this.mediasService.update(CreateMediaDto, (+id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.mediasService.remove(+id);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    }
  }
}

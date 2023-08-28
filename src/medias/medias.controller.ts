import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.mediasService.findOne(+id);
  }

  @Put('/medias/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() CreateMediaDto: CreateMediaDto) {
    return await this.mediasService.update(CreateMediaDto, Number(id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Medias')
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new media for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Media has been created" })
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.create(createMediaDto);
  }

  @Get()
  @ApiOperation({ summary: 'It retrieves all medias' })
  @ApiResponse({ status: HttpStatus.OK, description: "Medias retrieved" })
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a specific Media' })
  @ApiResponse({ status: HttpStatus.OK, description: "Media retrieved" })
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific Media' })
  @ApiResponse({ status: HttpStatus.OK, description: "Media updated" })
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Media' })
  @ApiResponse({ status: HttpStatus.OK, description: "Media deleted" })
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, Put, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ParseDatePipe } from './pipes/dates.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new publication for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Publication has been created" })
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'It retrieves all publications' })
  @ApiResponse({ status: HttpStatus.OK, description: "Publications retrieved" })
  findAll(
    @Query("published", new ParseBoolPipe({ optional: true })) published: boolean,
    @Query("after", new ParseDatePipe()) after: Date) {

    if (published !== undefined && !after) return this.publicationsService.findAllPublished(published);
    if (published === undefined && after) return this.publicationsService.findAllAfter(after);
    if (published !== undefined && after) return this.publicationsService.filter(published, after);

    return this.publicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a specific publication' })
  @ApiResponse({ status: HttpStatus.OK, description: "Publication retrieved" })
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific publication' })
  @ApiResponse({ status: HttpStatus.OK, description: "Publication updated" })
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific publication' })
  @ApiResponse({ status: HttpStatus.OK, description: "Publication deleted" })
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }
}

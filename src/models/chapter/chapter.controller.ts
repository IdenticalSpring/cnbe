import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('chapters')
@Controller('chapters')
@ApiBearerAuth('JWT')
@Public()
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new chapter' })
  @ApiResponse({ status: 201, description: 'The chapter has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all chapters for a specific course' })
  @ApiParam({ name: 'courseId', description: 'ID of the course' })
  @ApiResponse({ status: 200, description: 'List of chapters for the course.' })
  findAllByCourse(@Param('courseId') courseId: number) {
    return this.chapterService.findAllByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific chapter' })
  @ApiParam({ name: 'id', description: 'ID of the chapter' })
  @ApiResponse({ status: 200, description: 'Details of the chapter.' })
  @ApiResponse({ status: 404, description: 'Chapter not found.' })
  findOne(@Param('id') id: number) {
    return this.chapterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a chapter' })
  @ApiParam({ name: 'id', description: 'ID of the chapter' })
  @ApiBody({ type: UpdateChapterDto })
  @ApiResponse({ status: 200, description: 'The chapter has been updated.' })
  @ApiResponse({ status: 404, description: 'Chapter not found.' })
  update(@Param('id') id: number, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chapter' })
  @ApiParam({ name: 'id', description: 'ID of the chapter' })
  @ApiResponse({ status: 200, description: 'The chapter has been deleted.' })
  @ApiResponse({ status: 404, description: 'Chapter not found.' })
  remove(@Param('id') id: number) {
    return this.chapterService.remove(id);
  }

  @Post('reorder')
  @ApiOperation({ summary: 'Reorder chapters within a course' })
  @ApiBody({
    schema: {
      properties: {
        courseId: { type: 'integer', description: 'ID of the course' },
        orderedIds: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Array of chapter IDs in the desired order'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'The chapters have been reordered.' })
  reorder(@Body('courseId') courseId: number, @Body('orderedIds') orderedIds: number[]) {
    return this.chapterService.reorderChapters(courseId, orderedIds);
  }
}

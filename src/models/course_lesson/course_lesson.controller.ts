import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { LessonsService } from './course_lesson.service';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCourseLessonDto } from './dto/create-course_lesson.dto';
import { UpdateCourseLessonDto } from './dto/update-course_lesson.dto';
import { Public } from 'src/decorator/public.decorator';
import { CourseAccessGuard } from 'src/guard/course-access.guard';

@ApiTags('lessons')
@Controller('lessons')
@ApiBearerAuth('JWT')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createLessonDto: CreateCourseLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, description: 'List of all lessons.' })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':courseId/:id')
  @ApiOperation({ summary: 'Get a specific lesson by ID' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'Details of the lesson.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @UseGuards(CourseAccessGuard)
  findOne(@Param('id') id: string, @Param('courseId') courseId: string) {
   
    return this.lessonsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific lesson' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'The lesson has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateCourseLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific lesson' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'The lesson has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
  @Get('chapter/:chapterId')
  @ApiOperation({ summary: 'Get all lessons for a specific chapter' })
  @ApiParam({ name: 'chapterId', description: 'ID of the chapter' })
  @ApiResponse({ status: 200, description: 'List of lessons for the chapter.' })
  async findByChapter(@Param('chapterId') chapterId: string) {
    return this.lessonsService.findByChapterId(+chapterId);
  }
}

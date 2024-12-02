import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { LessonsService } from 'src/models/course_lesson/course_lesson.service';
import { CreateCourseLessonDto } from 'src/models/course_lesson/dto/create-course_lesson.dto';
import { UpdateCourseLessonDto } from 'src/models/course_lesson/dto/update-course_lesson.dto';

@ApiTags('admin/lessons')
@Controller('admin/lessons')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminLessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  // Tạo bài học mới
  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createLessonDto: CreateCourseLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  // Lấy tất cả bài học không phân trang
  @Get('all')
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, description: 'List of all lessons.' })
  findAll() {
    return this.lessonsService.findAll();
  }

  // Lấy tất cả bài học có phân trang
  @Get(`getAllPagination`)
  @ApiOperation({ summary: 'Get all lessons with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiResponse({ status: 200, description: 'List of all lessons with pagination.' })
  findAllPagination(@Query('page') page: number = 1) {
    return this.lessonsService.findAllWithPagination(page);
  }

  // Lấy chi tiết một bài học theo ID
  @Get(':courseId/:id')
  @ApiOperation({ summary: 'Get a specific lesson by ID' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'Details of the lesson.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  findOne(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.lessonsService.findOne(+id);
  }

  // Lấy tất cả bài học trong một chương cụ thể
  @Get('chapter/:chapterId/:courseId/:userId')
  @ApiOperation({ summary: 'Get all lessons for a specific chapter and user' })
  @ApiParam({ name: 'chapterId', description: 'ID of the chapter' })
  @ApiParam({ name: 'courseId', description: 'ID of the course' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of lessons for the chapter.' })
  async findByChapter(
    @Param('chapterId') chapterId: string,
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    // Truyền cả chapterId, courseId và userId vào service
    return this.lessonsService.findByChapterId(+chapterId, +courseId, +userId);
  }


  // Cập nhật bài học
  @Put(':id')
  @ApiOperation({ summary: 'Update a specific lesson' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'The lesson has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateCourseLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  // Xóa bài học
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific lesson' })
  @ApiParam({ name: 'id', description: 'ID of the lesson' })
  @ApiResponse({ status: 200, description: 'The lesson has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}

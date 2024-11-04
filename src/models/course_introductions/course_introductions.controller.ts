import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseIntroductionsService } from './course_introductions.service';
import { CreateCourseIntroductionDto } from './dto/create-course_introduction.dto';
import { UpdateCourseIntroductionDto } from './dto/update-course_introduction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
@Public()
@Controller('course-introductions')
@ApiTags('course-introductions')
@ApiBearerAuth('JWT')
export class CourseIntroductionsController {
  constructor(private readonly courseIntroductionsService: CourseIntroductionsService) {}

  @Post()
  create(@Body() createCourseIntroductionDto: CreateCourseIntroductionDto) {
    return this.courseIntroductionsService.create(createCourseIntroductionDto);
  }

  @Get()
  findAll() {
    return this.courseIntroductionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseIntroductionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseIntroductionDto: UpdateCourseIntroductionDto) {
    return this.courseIntroductionsService.update(+id, updateCourseIntroductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseIntroductionsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved course.' })
  findAll(): Promise<Courses[]> {
    return this.coursesService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  create(@Body() createCoursesDto: CreateCoursesDto): Promise<Courses> {
    return this.coursesService.create(createCoursesDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing course' })
  @ApiResponse({ status: 200, description: 'Successfully updated course.' })
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Courses> {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}

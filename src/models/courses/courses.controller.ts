import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorator/public.decorator';
import { CourseWithCounts } from './dto/CourseWithCounts.dto';
import { CourseAccessGuard } from 'src/guard/course-access.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Public()
@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth('JWT')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved course.' })
  findAll(): Promise<Courses[]> {
    return this.coursesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new course with image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string', format: 'binary' },
        types: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  async create(@Body() createCoursesDto: CreateCoursesDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      createCoursesDto.imageUrl = uploadedImage.secure_url;
    }
    return this.coursesService.create(createCoursesDto);
  }

  @Get('getByType')
  @ApiQuery({ name: 'type', required: true, type: String, description: 'Course type' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  async getByType(
    @Query('type') type: string,
    @Query('page') page: string = '1'
  ): Promise<{ data: CourseWithCounts[]; currentPage: number; totalPages: number; totalItems: number }> {
    return this.coursesService.getByType(type, +page || 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing course, including new image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string', format: 'binary' },
        types: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, description: 'Successfully updated course.' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Courses> {
    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      updateCourseDto.imageUrl = uploadedImage.secure_url;
    }
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}

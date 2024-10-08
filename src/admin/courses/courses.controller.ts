import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { CreateCoursesDto } from 'src/models/courses/dto/create-course.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/models/cloudinary/cloudinary.service';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from 'src/models/courses/courses.service';
import { UpdateCourseDto } from 'src/models/courses/dto/update-course.dto';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('admin/courses')
@Controller('admin/courses')
@UseGuards(RolesGuard)
export class AdminCoursesController {
  private readonly defaultLimit: number;
  constructor(
    private readonly coursesService: CoursesService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService, 
  ) { 
    this.defaultLimit = parseInt(this.configService.get<string>('COURSE_LIMIT'), 10) || 10;
  }
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved courses.' })
  findAll(): Promise<Courses[]> {
    return this.coursesService.findAll();
  }
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Roles('admin')
  @Get('page/:page')
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of courses per page' })
  @ApiOperation({ summary: 'Get courses with pagination' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved paginated courses.' })
  async findPaginated(
    @Param('page') page: number,
    @Query('limit') limit?: number, 
  ): Promise<Courses[]> {
    const finalLimit = limit ? +limit : this.defaultLimit;
    return this.coursesService.findPaginated(+page, finalLimit);
  }
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new course with image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  async create(@Body() createCoursesDto: CreateCoursesDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Missing required parameter - file');
    }
    const uploadedImage = await this.cloudinaryService.uploadImage(file);
    createCoursesDto.imageUrl = uploadedImage.secure_url;
    return this.coursesService.create(createCoursesDto as unknown as Courses); 
  }

  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing course, including new image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
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
    const course = await this.coursesService.findOne(+id);

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      updateCourseDto.imageUrl = uploadedImage.secure_url;

      if (course.imageUrl) {
        await this.cloudinaryService.deleteImage(course.imageUrl);
      }
    }

    return this.coursesService.update(+id, updateCourseDto as unknown as Courses);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}

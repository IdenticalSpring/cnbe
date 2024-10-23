import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Query } from '@nestjs/common';
import { CreateCoursesDto } from 'src/models/courses/dto/create-course.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/models/cloudinary/cloudinary.service';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from 'src/models/courses/courses.service';
import { UpdateCourseDto } from 'src/models/courses/dto/update-course.dto';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@ApiTags('admin/courses')
@Controller('admin/courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
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
  @Get('list')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved courses.' })
  findAll(): Promise<Courses[]> {
    return this.coursesService.findAll();
  }

  @Roles('admin')
  @Get('detail/:id')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the course.' })
  async findOne(@Param('id') id: string): Promise<Courses> {
    const course = await this.coursesService.findOne(+id);
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    return course;
  }

  @Roles('admin')
  @Get('list/page/:page')
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
  @Post('create')
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
  @Patch('update/:id')
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
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }

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
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete course by id' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the course.' })
  async remove(@Param('id') id: string) {
    const course = await this.coursesService.findOne(+id);
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    return this.coursesService.remove(+id);
  }
}

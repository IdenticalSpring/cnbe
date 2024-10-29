import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/passport/jwt-auth.guard";
import { RolesGuard } from "src/auth/passport/roles.guard";
import { Roles } from "src/decorator/admin.decorator";
import { CloudinaryService } from "src/models/cloudinary/cloudinary.service";
import { CoursesService } from "src/models/courses/courses.service";
import { CreateCoursesDto } from "src/models/courses/dto/create-course.dto";
import { UpdateCourseDto } from "src/models/courses/dto/update-course.dto";
import { Courses } from "src/models/courses/entities/courses.entity";


@ApiTags('admin/courses')
@Controller('admin/courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
export class AdminCoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }
  @Get('getPagination')
  @Roles('admin')
  @ApiOperation({ summary: 'Get paginated list of courses' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiResponse({ status: 200, description: 'Paginated courses retrieved successfully.' })
  async findAllWithPagination(
    @Query('page') page: string = '1',
  ): Promise<{ data: Courses[], currentPage: number, totalPages: number, totalItems: number }> {
    const pageNumber = parseInt(page, 10);
    return this.coursesService.findAllWithPagination(isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber);
  }

  @Get('list')
  @Roles('admin')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved courses.' })
  findAll(): Promise<Courses[]> {
    return this.coursesService.findAll();
  }

  @Get('detail/:id')
  @Roles('admin')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post('create')
  @Roles('admin')
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
      throw new BadRequestException('Missing required parameter - file');
    }
    const uploadedImage = await this.cloudinaryService.uploadImage(file);
    createCoursesDto.imageUrl = uploadedImage.secure_url;
    return this.coursesService.create(createCoursesDto);
  }

  @Patch('update/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update an existing course' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      updateCourseDto.imageUrl = uploadedImage.secure_url;
    }
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('delete/:id')
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
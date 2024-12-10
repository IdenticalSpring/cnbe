import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorator/admin.decorator';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { CreateCourseIntroductionDto } from 'src/models/course_introductions/dto/create-course_introduction.dto';
import { UpdateCourseIntroductionDto } from 'src/models/course_introductions/dto/update-course_introduction.dto';
import { CourseIntroductionsService } from 'src/models/course_introductions/course_introductions.service';
import { CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@ApiTags('admin/course-introductions')
@Controller('admin/course-introductions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
@Roles('admin')
export class AdminCourseIntroductionsController {
    constructor(private readonly courseIntroductionsService: CourseIntroductionsService) { }

    @Roles('admin')
    @Post()
    @ApiOperation({ summary: 'Create a new course introduction' })
    @ApiBody({ type: CreateCourseIntroductionDto }) 
    @ApiResponse({
        status: 201,
        description: 'The course introduction has been successfully created.',
        type: CourseIntroductions,
    })
    async create(@Body() createCourseIntroductionDto: CreateCourseIntroductionDto): Promise<CourseIntroductions> {
        return await this.courseIntroductionsService.create(createCourseIntroductionDto);
    }

    @Roles('admin')
    @Get()
    @ApiOperation({ summary: 'Get all course introductions' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved course introductions.', type: [CourseIntroductions] })
    async findAll(): Promise<CourseIntroductions[]> {
        return await this.courseIntroductionsService.findAll();
    }

    @Roles('admin')
    @Get('detail/:id')
    @ApiOperation({ summary: 'Get a course introduction by id' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the course introduction' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved a course introduction.', type: CourseIntroductions })
    async findOne(@Param('id') id: number): Promise<CourseIntroductions> {
        return await this.courseIntroductionsService.findOne(id);
    }

    @Roles('admin')
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an existing course introduction' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the course introduction' })
    @ApiBody({ type: UpdateCourseIntroductionDto })  // Thêm ApiBody để hiển thị trong Swagger
    @ApiResponse({
        status: 200,
        description: 'Successfully updated course introduction.',
        type: CourseIntroductions,
    })
    async update(@Param('id') id: number, @Body() updateCourseIntroductionDto: UpdateCourseIntroductionDto): Promise<CourseIntroductions> {
        return await this.courseIntroductionsService.update(id, updateCourseIntroductionDto);
    }

    @Roles('admin')
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a course introduction by id' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of the course introduction' })
    @ApiResponse({ status: 200, description: 'Successfully deleted course introduction.' })
    async remove(@Param('id') id: number): Promise<void> {
        return await this.courseIntroductionsService.remove(id);
    }
}

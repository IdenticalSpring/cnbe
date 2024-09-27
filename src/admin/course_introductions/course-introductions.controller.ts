import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/decorator/admin.decorator';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { CreateCourseIntroductionDto } from 'src/models/course_introductions/dto/create-course_introduction.dto';
import { UpdateCourseIntroductionDto } from 'src/models/course_introductions/dto/update-course_introduction.dto';
import { CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';
import { CourseIntroductionsService } from 'src/models/course_introductions/course_introductions.service';

@ApiTags('admin/course-introductions')
@Controller('admin/course-introductions')
@UseGuards(RolesGuard)
export class AdminCourseIntroductionsController {
    constructor(private readonly courseIntroductionsService: CourseIntroductionsService) { }

    @Roles('admin')
    @Get()
    @ApiOperation({ summary: 'Get all course introductions' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved course introductions.', type: [CourseIntroductions] })
    findAll(): Promise<CourseIntroductions[]> {
        return this.courseIntroductionsService.findAll();
    }

    @Roles('admin')
    @Get(':id')
    @ApiOperation({ summary: 'Get a course introduction by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the course introduction' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved a course introduction.', type: CourseIntroductions })
    findOne(@Param('id') id: string): Promise<CourseIntroductions> {
        return this.courseIntroductionsService.findOne(+id);
    }

    @Roles('admin')
    @Post()
    @ApiOperation({ summary: 'Create a new course introduction' })
    @ApiBody({
        description: 'Course Introduction Data',
        type: CreateCourseIntroductionDto,
        examples: {
            example1: {
                value: {
                    title: 'Introduction to NestJS',
                    content: 'This is an introduction to NestJS...',
                    courseId: 1,
                },
                description: 'An example of creating a new course introduction',
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'The course introduction has been successfully created.',
        type: CourseIntroductions,
    })
    create(@Body() createCourseIntroductionDto: CreateCourseIntroductionDto): Promise<CourseIntroductions> {
        return this.courseIntroductionsService.create(createCourseIntroductionDto);
    }

    @Roles('admin')
    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing course introduction' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the course introduction' })
    @ApiBody({
        description: 'Updated Course Introduction Data',
        type: UpdateCourseIntroductionDto,
        examples: {
            example1: {
                value: {
                    title: 'Updated Title',
                    content: 'Updated content for the course introduction...',
                },
                description: 'An example of updating a course introduction',
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated course introduction.',
        type: CourseIntroductions,
    })
    update(@Param('id') id: string, @Body() updateCourseIntroductionDto: UpdateCourseIntroductionDto): Promise<CourseIntroductions> {
        return this.courseIntroductionsService.update(+id, updateCourseIntroductionDto);
    }

    @Roles('admin')
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a course introduction by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the course introduction' })
    @ApiResponse({ status: 200, description: 'Successfully deleted course introduction.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.courseIntroductionsService.remove(+id);
    }
}

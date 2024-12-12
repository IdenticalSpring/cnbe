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
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorator/public.decorator';
import { ChapterService } from 'src/models/course_chapter/chapter.service';
import { CloudinaryService } from 'src/models/cloudinary/cloudinary.service';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';
import { CreateChapterDto } from 'src/models/course_chapter/dto/create-chapter.dto';
import { UpdateChapterDto } from 'src/models/course_chapter/dto/update-chapter.dto';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';

@ApiTags('admin/chapters')
@Controller('admin/chapters')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
@Roles('admin', 'mentor')
export class AdminChapterController {
    constructor(
        private readonly chapterService: ChapterService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all chapters with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiResponse({ status: 200, description: 'Successfully retrieved chapters.' })
    async findAll(
        @Query('page') page: number = 1,
    ): Promise<{
        data: Chapter[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
    }> {
        return this.chapterService.findAllWithPagination(page);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new chapter ' })
    @ApiResponse({
        status: 201,
        description: 'The chapter has been successfully created.',
    })
    create(@Body() createChapterDto: CreateChapterDto) {
        return this.chapterService.create(createChapterDto);
    }

    @Get('course/:courseId')
    @ApiOperation({ summary: 'Get all chapters for a specific course' })
    @ApiQuery({ name: 'courseId', type: 'integer', description: 'Course ID' })
    @ApiResponse({
        status: 200,
        description: 'List of chapters for the specified course.',
    })
    findAllByCourse(@Param('courseId') courseId: number) {
        return this.chapterService.findAllByCourse(courseId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get details of a specific chapter' })
    @ApiResponse({ status: 200, description: 'Details of the chapter.' })
    @ApiResponse({ status: 404, description: 'Chapter not found.' })
    findOne(@Param('id') id: number) {
        return this.chapterService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a chapter' })
    @ApiParam({ name: 'id', description: 'ID of the chapter' })
    @ApiBody({ type: UpdateChapterDto })
    @ApiResponse({ status: 200, description: 'The chapter has been updated.' })
    @ApiResponse({ status: 404, description: 'Chapter not found.' })
    update(@Param('id') id: number, @Body() updateChapterDto: UpdateChapterDto) {
        return this.chapterService.update(id, updateChapterDto);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a chapter' })
    @ApiResponse({ status: 200, description: 'The chapter has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Chapter not found.' })
    remove(@Param('id') id: number) {
        return this.chapterService.remove(id);
    }

    @Post('reorder')
    @ApiOperation({ summary: 'Reorder chapters within a course' })
    @ApiBody({
        schema: {
            properties: {
                courseId: { type: 'integer', description: 'ID of the course' },
                orderedIds: {
                    type: 'array',
                    items: { type: 'integer' },
                    description: 'Array of chapter IDs in the desired order',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'The chapters have been successfully reordered.',
    })
    reorder(@Body('courseId') courseId: number, @Body('orderedIds') orderedIds: number[]) {
        return this.chapterService.reorderChapters(courseId, orderedIds);
    }
}

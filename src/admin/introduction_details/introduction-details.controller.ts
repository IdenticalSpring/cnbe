import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';
import { CreateIntroductionDetailDto } from 'src/models/introduction_details/dto/create-introduction_detail.dto';
import { UpdateIntroductionDetailDto } from 'src/models/introduction_details/dto/update-introduction_detail.dto';
import { IntroductionDetails } from 'src/models/introduction_details/entities/introduction_detail.entity';
import { IntroductionDetailsService } from 'src/models/introduction_details/introduction_details.service';

@ApiTags('admin/introduction-details')
@Controller('admin/introduction-details')
@UseGuards(RolesGuard)
export class AdminIntroductionDetailsController {
    constructor(private readonly introductionDetailsService: IntroductionDetailsService) { }

    @Roles('admin')
    @Get()
    @ApiOperation({ summary: 'Get all introduction details' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved introduction details.', type: [IntroductionDetails] })
    findAll(): Promise<IntroductionDetails[]> {
        return this.introductionDetailsService.findAll();
    }

    @Roles('admin')
    @Get(':id')
    @ApiOperation({ summary: 'Get an introduction detail by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the introduction detail' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved an introduction detail.', type: IntroductionDetails })
    findOne(@Param('id') id: string): Promise<IntroductionDetails> {
        return this.introductionDetailsService.findOne(+id);
    }

    @Roles('admin')
    @Post()
    @ApiOperation({ summary: 'Create a new introduction detail' })
    @ApiBody({
        description: 'Introduction Detail Data',
        type: CreateIntroductionDetailDto,
        examples: {
            example1: {
                value: {
                    title: 'Detail Title',
                    detail: 'Detail description...'
                 
                },
                description: 'An example of creating a new introduction detail',
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'The introduction detail has been successfully created.',
        type: IntroductionDetails,
    })
    create(@Body() createIntroductionDetailDto: CreateIntroductionDetailDto): Promise<IntroductionDetails> {
        return this.introductionDetailsService.create(createIntroductionDetailDto);
    }

    @Roles('admin')
    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing introduction detail' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the introduction detail' })
    @ApiBody({
        description: 'Updated Introduction Detail Data',
        type: UpdateIntroductionDetailDto,
        examples: {
            example1: {
                value: {
                    title: 'Updated Detail Title',
                    detail: 'Updated description for introduction detail...',
                },
                description: 'An example of updating an introduction detail',
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated introduction detail.',
        type: IntroductionDetails,
    })
    update(@Param('id') id: string, @Body() updateIntroductionDetailDto: UpdateIntroductionDetailDto): Promise<IntroductionDetails> {
        return this.introductionDetailsService.update(+id, updateIntroductionDetailDto);
    }

    @Roles('admin')
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an introduction detail by id' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID of the introduction detail' })
    @ApiResponse({ status: 200, description: 'Successfully deleted introduction detail.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.introductionDetailsService.remove(+id);
    }
}

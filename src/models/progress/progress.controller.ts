import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('progress')
@ApiBearerAuth('JWT')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new progress record' })
  @ApiBody({ type: CreateProgressDto })
  @ApiResponse({ status: 201, description: 'The progress record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all progress records' })
  @ApiResponse({ status: 200, description: 'List of all progress records.' })
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific progress record' })
  @ApiParam({ name: 'id', description: 'ID of the progress record' })
  @ApiResponse({ status: 200, description: 'Details of the progress record.' })
  @ApiResponse({ status: 404, description: 'Progress record not found.' })
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(+id);
  }
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all progress records for a specific user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of progress records for the user.' })
  @ApiResponse({ status: 404, description: 'User not found or no progress records found.' })
  findAllByUser(@Param('userId') userId: string) {
    return this.progressService.findAllByUser(+userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific progress record' })
  @ApiParam({ name: 'id', description: 'ID of the progress record' })
  @ApiBody({ type: UpdateProgressDto })
  @ApiResponse({ status: 200, description: 'The progress record has been updated.' })
  @ApiResponse({ status: 404, description: 'Progress record not found.' })
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(+id, updateProgressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific progress record' })
  @ApiParam({ name: 'id', description: 'ID of the progress record' })
  @ApiResponse({ status: 200, description: 'The progress record has been deleted.' })
  @ApiResponse({ status: 404, description: 'Progress record not found.' })
  remove(@Param('id') id: string) {
    return this.progressService.remove(+id);
  }
}

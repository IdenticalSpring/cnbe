// enrollments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './entities/enrollments.entity';
import { UpdateEnrollmentsDto } from './dto/update-enrollments';
import { CreateEnrollmentsDto } from './dto/create-enrollments';

@ApiTags('enrollments')
@Controller('enrollments')
@ApiBearerAuth('JWT')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved enrollments.',
  })
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  @ApiResponse({
    status: 201,
    description: 'The enrollment has been successfully created.',
  })
  create(
    @Body() createEnrollmentDto: CreateEnrollmentsDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enrollment> {
    return this.enrollmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing enrollment' })
  @ApiResponse({ status: 200, description: 'Successfully updated enrollment.' })
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentsDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.enrollmentsService.remove(+id);
  }
}

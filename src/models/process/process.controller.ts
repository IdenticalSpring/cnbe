import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProcessService } from './process.service';
import { Process } from './entities/process.entity';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@ApiTags('process')
@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  @ApiOperation({ summary: 'Get all process records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved process records.',
  })
  findAll(): Promise<Process[]> {
    return this.processService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new process record' })
  @ApiResponse({
    status: 201,
    description: 'The process record has been successfully created.',
  })
  create(@Body() createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processService.create(createProcessDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Process> {
    return this.processService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing process record' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated process record.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<Process> {
    return this.processService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.processService.remove(+id);
  }
}

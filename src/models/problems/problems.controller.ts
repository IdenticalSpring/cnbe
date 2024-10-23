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
import { PromblemsService } from './problems.service';
import { Problems } from './entitites/problems.entity';
import { CreateProblemsDto } from './dto/create-problems.dto';
import { UpdateProblemsDto } from './dto/update-problems.dto';

@ApiTags('problems')
@Controller('problems')
@ApiBearerAuth('JWT')
export class ProblemsController {
  constructor(private readonly exercisesService: PromblemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all problems' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved exercises.',
  })
  findAll(): Promise<Problems[]> {
    return this.exercisesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new problems' })
  @ApiResponse({
    status: 201,
    description: 'The problems has been successfully created.',
  })
  create(@Body() createExerciseDto: CreateProblemsDto): Promise<Problems> {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Problems> {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing problems' })
  @ApiResponse({ status: 200, description: 'Successfully updated problems.' })
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateProblemsDto,
  ): Promise<Problems> {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.exercisesService.remove(+id);
  }
}

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
import { ExercisesService } from './exercises.service';
import { Exercises } from './entitites/exercises.entity';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved exercises.',
  })
  findAll(): Promise<Exercises[]> {
    return this.exercisesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({
    status: 201,
    description: 'The exercise has been successfully created.',
  })
  create(@Body() createExerciseDto: CreateExercisesDto): Promise<Exercises> {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Exercises> {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing exercise' })
  @ApiResponse({ status: 200, description: 'Successfully updated exercise.' })
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExercisesDto,
  ): Promise<Exercises> {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.exercisesService.remove(+id);
  }
}

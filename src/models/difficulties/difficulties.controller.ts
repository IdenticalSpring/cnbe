import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulties.entites';
import { CreateDifficultyDto } from './dto/create-difficulties.dto';

@ApiTags('Difficulties')
@Controller('difficulties')
@ApiBearerAuth('JWT')
export class DifficultiesController {
  constructor(private readonly difficultiesService: DifficultiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new difficulty' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The difficulty has been successfully created.',
    type: Difficulty,
  })
  async create(
    @Body() createDifficultyDto: CreateDifficultyDto,
  ): Promise<Difficulty> {
    return this.difficultiesService.create(createDifficultyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all difficulties' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of difficulties retrieved successfully.',
    type: [Difficulty],
  })
  async findAll(): Promise<Difficulty[]> {
    return this.difficultiesService.findAll();
  }
}

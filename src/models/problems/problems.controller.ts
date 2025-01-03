import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProblemsDto } from './dto/create-problems.dto';
import { UpdateProblemsDto } from './dto/update-problems.dto';
import { PromblemsService } from './problems.service';
import { Problems } from './entitites/problems.entity';
import { Public } from 'src/decorator/public.decorator';
@Public()
@ApiTags('problems')
@Controller('problems')
@ApiBearerAuth('JWT')
export class ProblemsController {
  constructor(private readonly problemsService: PromblemsService) { }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all problems' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all problems without pagination.',
  })
  getAllProblems(): Promise<Problems[]> {
    return this.problemsService.findAll();
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Retrieve problems with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved problems with pagination.',
  })
  getPaginatedProblems(@Query('page') page: number = 1) {
    return this.problemsService.findAllWithPagination(page);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new problem' })
  @ApiResponse({
    status: 201,
    description: 'The problem has been successfully created.',
  })
  createProblem(@Body() createProblemDto: CreateProblemsDto): Promise<Problems> {
    return this.problemsService.create(createProblemDto);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Retrieve a specific problem by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the specified problem.',
  })
  getProblemById(@Param('id') id: string): Promise<Problems> {
    return this.problemsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an existing problem' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the specified problem.',
  })
  updateProblem(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemsDto,
  ): Promise<Problems> {
    return this.problemsService.update(+id, updateProblemDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a specific problem by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the specified problem.',
  })
  deleteProblem(@Param('id') id: string): Promise<void> {
    return this.problemsService.remove(+id);
  }
  @Get('search-by-difficulty')
  @ApiOperation({ summary: 'Search problems by difficulty' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved problems by difficulty.',
  })
  searchByDifficulty(
    @Query('difficultyId') difficultyId: number,
  ): Promise<{ data: Problems[]}> {
    return this.problemsService.findByDifficulty(difficultyId);
  }
  @Get('search-by-title')
  @ApiOperation({ summary: 'Search problems by title' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved problems by title.',
  })
  searchByTitle(
    @Query('title') title: string,
  ): Promise<{ data: Problems[];}> {
    return this.problemsService.findByTitle(title);
  }

}

import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Solutions')
@Controller('solutions')
@ApiBearerAuth('JWT')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new solution' })
  @ApiResponse({ status: 201, description: 'Solution created successfully.' })
  createSolution(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionService.createSolution(createSolutionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a solution' })
  @ApiResponse({ status: 200, description: 'Solution updated successfully.' })
  updateSolution(@Param('id') id: number, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionService.updateSolution(id, updateSolutionDto);
  }


  @Get()
  @ApiOperation({ summary: 'Get all solutions' })
  @ApiResponse({ status: 200, description: 'List of solutions.' })
  findAllSolutions() {
    return this.solutionService.findAllSolutions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a solution by ID' })
  @ApiResponse({ status: 200, description: 'Solution data.' })
  findSolutionById(@Param('id') id: number) {
    return this.solutionService.findSolutionById(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a solution' })
  @ApiResponse({ status: 200, description: 'Solution deleted successfully.' })
  deleteSolution(@Param('id') id: number) {
    return this.solutionService.deleteSolution(id);
  }

}

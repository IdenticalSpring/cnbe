import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProblemCompaniesService } from './pb_com.service';
import { CreateProblemCompanyDto } from './dto/problems_companies.dto';
import { ProblemCompanies } from './entities/problems_companies.entits';

@ApiTags('ProblemCompanies')
@Controller('problem-companies')
@ApiBearerAuth('JWT')
export class ProblemCompaniesController {
  constructor(
    private readonly problemCompaniesService: ProblemCompaniesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new problem-company link' })
  async create(
    @Body() createProblemCompanyDto: CreateProblemCompanyDto,
  ): Promise<ProblemCompanies> {
    return this.problemCompaniesService.create(createProblemCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all problem-company links' })
  async findAll(): Promise<ProblemCompanies[]> {
    return this.problemCompaniesService.findAll();
  }

  @Delete(':problemId/:companyId')
  @ApiOperation({ summary: 'Delete a problem-company link' })
  async delete(
    @Param('problemId') problemId: number,
    @Param('companyId') companyId: number,
  ): Promise<void> {
    return this.problemCompaniesService.delete(problemId, companyId);
  }
  // New endpoint to get companies by problem ID
  @Get(':problemId/companies')
  @ApiOperation({ summary: 'Get companies linked to a specific problem' })
  async getCompaniesByProblemId(
    @Param('problemId') problemId: number,
  ): Promise<ProblemCompanies[]> {
    return this.problemCompaniesService.findCompaniesByProblemId(problemId);
  }
}

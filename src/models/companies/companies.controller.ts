import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Companies } from './entities/companies.entities';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Companies')
@Controller('companies')
@ApiBearerAuth('JWT')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The company has been successfully created.',
    type: Companies,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data.',
  })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Companies> {
    try {
      return await this.companiesService.create(createCompanyDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of companies retrieved successfully.',
    type: [Companies],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No companies found.',
  })
  async findAll(): Promise<Companies[]> {
    const companies = await this.companiesService.findAll();
    if (!companies || companies.length === 0) {
      throw new HttpException('No companies found', HttpStatus.NOT_FOUND);
    }
    return companies;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  async update(
    @Param('id') id: number,
    @Body() updateCompaniesDto: UpdateCompanyDto,
  ): Promise<Companies> {
    return this.companiesService.update(id, updateCompaniesDto);
  }
  @Public()
  @Get('with-problem-count')
  @ApiOperation({ summary: 'Get all companies with problem count' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of companies with the count of related problems retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No companies found.',
  })
  async findAllWithProblemCount(): Promise<any[]> {
    return await this.companiesService.findAllWithProblemCount();
  }
}

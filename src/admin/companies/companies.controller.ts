import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpException,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/roles.guard';

import { Public } from 'src/decorator/public.decorator';
import { CompaniesService } from 'src/models/companies/companies.service';
import { CreateCompanyDto } from 'src/models/companies/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/models/companies/dto/update-company.dto';
import { Companies } from 'src/models/companies/entities/companies.entities';

@ApiTags('admin/Companies')
  @Controller('admin/companies')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminCompaniesController {
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
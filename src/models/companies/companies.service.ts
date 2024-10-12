import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Companies } from './entities/companies.entities';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies)
    private readonly companiesModel: typeof Companies,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Companies> {
    try {
      const newCompany = await this.companiesModel.create(createCompanyDto);
      return newCompany;
    } catch (error) {
      throw new HttpException(
        'Failed to create company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Companies[]> {
    try {
      const companies = await this.companiesModel.findAll();
      if (!companies || companies.length === 0) {
        throw new HttpException('No companies found', HttpStatus.NOT_FOUND);
      }
      return companies;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve companies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Cập nhật thông tin công ty
  async update(
    id: number,
    updateCompaniesDto: UpdateCompanyDto,
  ): Promise<Companies> {
    const company = await this.companiesModel.findByPk(id);
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    // Cập nhật các trường
    return company.update(updateCompaniesDto);
  }
}

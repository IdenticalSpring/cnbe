import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProblemCompanies } from './entities/problems_companies.entits';
import { CreateProblemCompanyDto } from './dto/problems_companies.dto';

@Injectable()
export class ProblemCompaniesService {
  constructor(
    @InjectModel(ProblemCompanies)
    private readonly problemCompaniesModel: typeof ProblemCompanies,
  ) {}

  async create(
    createProblemCompanyDto: CreateProblemCompanyDto,
  ): Promise<ProblemCompanies> {
    return this.problemCompaniesModel.create(createProblemCompanyDto);
  }

  async findAll(): Promise<ProblemCompanies[]> {
    return this.problemCompaniesModel.findAll();
  }

  async delete(problemId: number, companyId: number): Promise<void> {
    await this.problemCompaniesModel.destroy({
      where: {
        problemId,
        companyId,
      },
    });
  }
}

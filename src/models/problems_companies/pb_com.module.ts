import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProblemCompanies } from './entities/problems_companies.entits';
import { ProblemCompaniesService } from './pb_com.service';
import { ProblemCompaniesController } from './pb_com.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProblemCompanies])],
  providers: [ProblemCompaniesService],
  controllers: [ProblemCompaniesController],
  exports: [ProblemCompaniesService],
})
export class ProblemCompaniesModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Companies } from './entities/companies.entities';

@Module({
  imports: [SequelizeModule.forFeature([Companies])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}

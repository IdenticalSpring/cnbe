import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Companies } from 'src/models/companies/entities/companies.entities';
import { AdminCompaniesController } from './companies.controller';
import { CompaniesService } from 'src/models/companies/companies.service';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';


@Module({
  imports: [SequelizeModule.forFeature([Companies])],
  controllers: [AdminCompaniesController],
  providers: [CompaniesService, RolesGuard, JwtAuthGuard],
})
export class AdminCompaniesModule {}

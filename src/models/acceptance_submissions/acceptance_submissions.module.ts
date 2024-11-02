import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AcceptanceSubmissionsService } from './acceptance_submissions.service';
import { AcceptanceSubmissionsController } from './acceptance_submissions.controller';
import { Problems } from 'src/models/problems/entitites/problems.entity';
import { User } from 'src/models/users/entities/user.entity';
import { AcceptanceSubmission } from './entities/acceptance_submissions.entity';

@Module({
  imports: [SequelizeModule.forFeature([AcceptanceSubmission, Problems, User])],
  controllers: [AcceptanceSubmissionsController],
  providers: [AcceptanceSubmissionsService],
})
export class AcceptanceSubmissionsModule {}

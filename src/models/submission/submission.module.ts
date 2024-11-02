import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Submission } from './entities/submission.model';
import { AcceptanceSubmission } from '../acceptance_submissions/entities/acceptance_submissions.entity';

@Module({
  imports: [SequelizeModule.forFeature([Submission, AcceptanceSubmission])], // Kết nối model Submission với Sequelize
  controllers: [SubmissionController], // Controller cho module này
  providers: [SubmissionService], // Service xử lý logic
})
export class SubmissionModule {}

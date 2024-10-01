import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Submission } from './entities/submission.model';

@Module({
  imports: [SequelizeModule.forFeature([Submission])], // Kết nối model Submission với Sequelize
  controllers: [SubmissionController], // Controller cho module này
  providers: [SubmissionService], // Service xử lý logic
})
export class SubmissionModule {}

import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './entities/enrollments.entity';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentModule {}

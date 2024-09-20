import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercises } from './entitites/exercises.entity';

@Module({
  imports: [SequelizeModule.forFeature([Exercises])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}

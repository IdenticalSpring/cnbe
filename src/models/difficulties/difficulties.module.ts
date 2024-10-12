import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DifficultiesController } from './difficulties.controller';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulties.entites';

@Module({
  imports: [SequelizeModule.forFeature([Difficulty])],
  controllers: [DifficultiesController],
  providers: [DifficultiesService],
})
export class DifficultiesModule {}

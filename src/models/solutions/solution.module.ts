import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Solutions } from './entities/solution.entity';

import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';



@Module({
  imports: [SequelizeModule.forFeature([Solutions])],
  providers: [SolutionService],
  controllers: [SolutionController],
  exports: [SolutionService]
})
export class SolutionModule { }

import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ProblemsController } from './problems.controller';
import { PromblemsService } from './problems.service';
import { Problems } from './entitites/problems.entity';

@Module({
  imports: [SequelizeModule.forFeature([Problems])],
  controllers: [ProblemsController],
  providers: [PromblemsService],
  exports: [PromblemsService]
})
export class ProblemsModule {}

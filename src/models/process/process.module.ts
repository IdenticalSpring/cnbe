import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Process } from './entities/process.entity';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
  imports: [SequelizeModule.forFeature([Process])],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}

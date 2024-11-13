// src/topics/topics.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AdminTopicsController } from './topics.controller';
import { TopicsService } from 'src/models/topics/topics.service';
import { Topics } from 'src/models/topics/entities/topics.entities';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';


@Module({
  imports: [SequelizeModule.forFeature([Topics])],
  controllers: [AdminTopicsController],
  providers: [TopicsService, RolesGuard, JwtAuthGuard],
})
export class AdminTopicsModule {}

// src/test-case/test-case.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { languageCode } from '../language_code/entities/language_code.entity';
import { Problems } from '../problems/entitites/problems.entity';
import { TestCase } from './entities/testcase.entity';
import { TestCaseController } from './testcase.controller';
import { TestCaseService } from './testcase.service';

@Module({
  imports: [SequelizeModule.forFeature([TestCase, languageCode, Problems])],
  controllers: [TestCaseController],
  providers: [TestCaseService],
})
export class TestCaseModule {}

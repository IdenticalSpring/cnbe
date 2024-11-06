// src/models/categories/category.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/categories.entity';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

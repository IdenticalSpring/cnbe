// src/models/categories/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/categories.entity';
import { CreateCategoryDto } from './dto/create-categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(data);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryModel.findByPk(id);
  }

  async update(id: number, data: CreateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    if (category) {
      await category.update(data);
    }
    return category;
  }

  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (category) {
      await category.destroy();
    }
  }
}

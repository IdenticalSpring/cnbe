import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDiscussionDto } from './dto/categories_discusion.dto';
import { CategoryDiscussion } from './entities/categories_discussion';

@Injectable()
export class CategoryDiscussionService {
  constructor(
    @InjectModel(CategoryDiscussion)
    private categoryDiscussionModel: typeof CategoryDiscussion,
  ) {}

  async create(
    createCategoryDiscussionDto: CreateCategoryDiscussionDto,
  ): Promise<CategoryDiscussion> {
    return this.categoryDiscussionModel.create(createCategoryDiscussionDto);
  }

  // Bạn có thể thêm các phương thức khác như find, delete, etc.
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDiscussionDto } from './dto/categories_discusion.dto';
import { CategoryDiscussion } from './entities/categories_discussion';
import { Category } from '../categories/entities/categories.entity';
import { Discussions } from '../discussion/entities/discussion.entity';

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

  // Lọc và phân trang dữ liệu
  async findAll(
    filter: { categoryId?: number; discussionId?: number },
    page: number = 1,
    limit: number = 20,
  ): Promise<{
    data: CategoryDiscussion[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.categoryDiscussionModel.findAndCountAll({
      where: {
        ...(filter.categoryId && { categoryId: filter.categoryId }), // Lọc theo categoryId nếu có
        ...(filter.discussionId && { discussionId: filter.discussionId }), // Lọc theo discussionId nếu có
      },
      include: [
        { model: Category, attributes: ['id', 'name'] }, // Include Category data
        { model: Discussions, attributes: ['id', 'title'] }, // Include Discussion data
      ],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      total: count,
      currentPage: page,
      totalPages,
    };
  }
}

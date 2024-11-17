import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CategoryDiscussionService } from './categories_discussion.service';
import { CreateCategoryDiscussionDto } from './dto/categories_discusion.dto';
import { CategoryDiscussion } from './entities/categories_discussion';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('category-discussion')
@Controller('category-discussion')
@ApiBearerAuth('JWT')
export class CategoryDiscussionController {
  constructor(
    private readonly categoryDiscussionService: CategoryDiscussionService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDiscussionDto: CreateCategoryDiscussionDto,
  ): Promise<CategoryDiscussion> {
    return this.categoryDiscussionService.create(createCategoryDiscussionDto);
  }

  // Lọc và phân trang dữ liệu
  @Get()
  async findAll(
    @Query('categoryId') categoryId?: number,
    @Query('page') page: number = 1,
  ) {
    const filter = {
      ...(categoryId && { categoryId: Number(categoryId) }),
    };
    return this.categoryDiscussionService.findAll(filter, Number(page));
  }

  // Bạn có thể thêm các phương thức khác như get, delete, etc.
}

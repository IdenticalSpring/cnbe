import { Controller, Post, Body } from '@nestjs/common';
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

  // Bạn có thể thêm các phương thức khác như get, delete, etc.
}

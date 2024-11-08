import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  Query,
} from '@nestjs/common';
import { DiscussService } from './discussion.service';
import { CreateDiscussDto } from './dto/create-discussion.dto';
import { Discussions } from './entities/discussion.entity';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
@ApiTags('discuss')
@Controller('discuss')
@ApiBearerAuth('JWT') 
@Public()


export class DiscussController {
  constructor(private readonly discussService: DiscussService) {}

  @Post()
  async create(
    @Body() createDiscussDto: CreateDiscussDto,
  ): Promise<Discussions> {
    return this.discussService.create(createDiscussDto);
  }

  @Get(`getAll`)
  async findAll(): Promise<Discussions[]> {
    return this.discussService.findAll();
  }

  @Get('getOne:id')
  async findOne(@Param('id') id: number): Promise<Discussions> {
    return this.discussService.findOne(id);
  }

  @Get(`getpaginated`)
 
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  async findAllPagination(
    @Query('page') page: number = 1,
  ): Promise<{
    data: Discussions[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return this.discussService.findAllPagination(page);
  }
  @ApiOperation({ summary: 'Click Button Vote' })
  @Patch(':id/upvote')
  async upvote(@Param('id') id: number) {
    return this.discussService.upvoteDiscuss(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiscussDto: CreateDiscussDto,
  ): Promise<Discussions> {
    return this.discussService.update(id, updateDiscussDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.discussService.delete(id);
  }
}

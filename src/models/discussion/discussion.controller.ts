import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { DiscussService } from './discussion.service';
import { CreateDiscussDto } from './dto/create-discussion.dto';
import { Discussions } from './entities/discussion.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('discuss')
@Controller('discuss')
@ApiBearerAuth('JWT')
export class DiscussController {
  constructor(private readonly discussService: DiscussService) {}

  @Post()
  async create(
    @Body() createDiscussDto: CreateDiscussDto,
  ): Promise<Discussions> {
    return this.discussService.create(createDiscussDto);
  }

  @Get()
  async findAll(): Promise<Discussions[]> {
    return this.discussService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Discussions> {
    return this.discussService.findOne(id);
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

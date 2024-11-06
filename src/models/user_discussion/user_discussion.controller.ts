import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserDiscussion } from './entities/user_discussion.entity';
import { UserDiscussionService } from './user_discussion.service';
import { CreateUserDiscussionDto } from './dto/user_discussion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user_discussion')
@Controller('user-discussions')
@ApiBearerAuth('JWT')
export class UserDiscussionController {
  constructor(private readonly userDiscussionService: UserDiscussionService) {}

  @Post()
  async create(
    @Body() createUserDiscussionDto: CreateUserDiscussionDto,
  ): Promise<UserDiscussion> {
    return this.userDiscussionService.create(createUserDiscussionDto);
  }

  @Get()
  async findAll(): Promise<UserDiscussion[]> {
    return this.userDiscussionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDiscussion> {
    return this.userDiscussionService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userDiscussionService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserChapterProgressService } from './user_chapter_progress.service';
import { UpdateUserChapterProgressDto } from './dto/update-user_chapter_progress.dto';
import { CreateUserChapterProgressDto } from './dto/create-user_chapter_progress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user-chapter-progress')
@Controller('user-chapter-progress')
@ApiBearerAuth('JWT')
export class UserChapterProgressController {
  constructor(private readonly service: UserChapterProgressService) {}

  @Post()
  create(@Body() dto: CreateUserChapterProgressDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserChapterProgressDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}

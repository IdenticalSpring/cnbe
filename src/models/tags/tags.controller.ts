// tag.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TagService } from './tags.service';
import { CreateTagDto } from './dto/create-tags.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
@ApiBearerAuth('JWT')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}

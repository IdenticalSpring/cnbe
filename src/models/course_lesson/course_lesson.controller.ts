import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LessonsService } from './course_lesson.service';


@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post()
  create(@Body() createLessonDto: any) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: any) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}

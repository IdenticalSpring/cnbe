import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserCourseProgressService } from './user_course_progress.service';
import { CreateUserCourseProgressDto } from './dto/create-user_course_progress.dto';
import { UpdateUserCourseProgressDto } from './dto/update-user_controller_progress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user-course-progress')
@ApiBearerAuth('JWT')
@Controller('user-course-progress')
export class UserCourseProgressController {
  constructor(private readonly service: UserCourseProgressService) {}

  @Post()
  create(@Body() dto: CreateUserCourseProgressDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateUserCourseProgressDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}

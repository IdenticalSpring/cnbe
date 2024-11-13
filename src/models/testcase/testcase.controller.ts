// src/test-case/test-case.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TestCaseService } from './testcase.service';
import { CreateTestCaseDto } from './dto/create-testcase.dto';
import { UpdateTestCaseDto } from './dto/update-testcase.dto';

@ApiTags('TestCase')
@Controller('test-cases')
@ApiBearerAuth('JWT')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  // Tạo mới TestCase

  @Post()
  create(@Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCaseService.create(createTestCaseDto);
  }

  // Lấy tất cả TestCases
  @Get()
  findAll() {
    return this.testCaseService.findAll();
  }

  // Lấy một TestCase theo ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testCaseService.findOne(id);
  }

  // Cập nhật TestCase
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTestCaseDto: UpdateTestCaseDto,
  ) {
    return this.testCaseService.update(id, updateTestCaseDto);
  }

  // Xóa TestCase
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testCaseService.remove(id);
  }
}

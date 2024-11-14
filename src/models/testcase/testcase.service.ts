// src/test-case/test-case.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TestCase } from './entities/testcase.entity';
import { CreateTestCaseDto } from './dto/create-testcase.dto';
import { UpdateTestCaseDto } from './dto/update-testcase.dto';
import { languageCode } from '../language_code/entities/language_code.entity';
import { Problems } from '../problems/entitites/problems.entity';

@Injectable()
export class TestCaseService {
  constructor(
    @InjectModel(TestCase)
    private readonly testCaseModel: typeof TestCase,
  ) {}

  // Tạo mới TestCase
  async create(createTestCaseDto: CreateTestCaseDto): Promise<TestCase> {
    return this.testCaseModel.create(createTestCaseDto);
  }

  // Lấy tất cả TestCases
  async findAll(): Promise<TestCase[]> {
    return this.testCaseModel.findAll({
      include: [
        { model: Problems }, // Lấy thông tin Problems của test case
      ],
    });
  }

  // Lấy một TestCase theo ID
  async findOne(id: number): Promise<TestCase> {
    return this.testCaseModel.findByPk(id, {
      include: [
        { model: Problems }, // Lấy thông tin Problems của test case
      ],
    });
  }

  // Cập nhật TestCase theo ID
  async update(
    id: number,
    updateTestCaseDto: UpdateTestCaseDto,
  ): Promise<[number, TestCase[]]> {
    return this.testCaseModel.update(updateTestCaseDto, {
      where: { id },
      returning: true, // Đảm bảo nhận được mảng TestCase đã cập nhật
    });
  }

  // Xóa TestCase theo ID
  async remove(id: number): Promise<void> {
    const testCase = await this.findOne(id);
    if (testCase) {
      await testCase.destroy();
    }
  }
}

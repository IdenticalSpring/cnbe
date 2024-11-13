// src/language-code/language-code.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { languageCode } from './entities/language_code.entity';
import { CreateLanguageCodeDto } from './dto/create-language_code.dto';
import { UpdateLanguageCodeDto } from './dto/update-language_code.dto';

@Injectable()
export class LanguageCodeService {
  constructor(
    @InjectModel(languageCode)
    private readonly languageCodeModel: typeof languageCode,
  ) {}

  // Tạo mới language code
  async create(
    createLanguageCodeDto: CreateLanguageCodeDto,
  ): Promise<languageCode> {
    const language = await this.languageCodeModel.create(createLanguageCodeDto);
    return language;
  }

  // Lấy tất cả language codes
  async findAll(): Promise<languageCode[]> {
    return this.languageCodeModel.findAll();
  }

  // Lấy một language code theo ID
  async findOne(id: number): Promise<languageCode> {
    return this.languageCodeModel.findByPk(id);
  }

  // src/language-code/language-code.service.ts
  async update(
    id: number,
    updateLanguageCodeDto: UpdateLanguageCodeDto,
  ): Promise<[number, languageCode[]]> {
    const result = await this.languageCodeModel.update(updateLanguageCodeDto, {
      where: { id },
      returning: true, // Đảm bảo rằng bạn nhận được mảng các bản ghi đã cập nhật
    });

    return result; // Trả về kết quả dưới dạng mảng [affectedCount, languageCode[]]
  }

  // Xóa language code theo ID
  async remove(id: number): Promise<void> {
    const language = await this.findOne(id);
    if (language) {
      await language.destroy();
    }
  }
}

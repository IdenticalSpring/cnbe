// src/language-code/language-code.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LanguageCodeService } from './language.service';
import { CreateLanguageCodeDto } from './dto/create-language_code.dto';
import { UpdateLanguageCodeDto } from './dto/update-language_code.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('LanguageCode')
@Controller('language-codes')
@ApiBearerAuth('JWT')
export class LanguageCodeController {
  constructor(private readonly languageCodeService: LanguageCodeService) {}

  // Tạo mới language code
  @Post()
  create(@Body() createLanguageCodeDto: CreateLanguageCodeDto) {
    return this.languageCodeService.create(createLanguageCodeDto);
  }

  // Lấy tất cả language codes
  @Get()
  findAll() {
    return this.languageCodeService.findAll();
  }

  // Lấy một language code theo ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.languageCodeService.findOne(id);
  }

  // Cập nhật language code
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateLanguageCodeDto: UpdateLanguageCodeDto,
  ) {
    return this.languageCodeService.update(id, updateLanguageCodeDto);
  }

  // Xóa language code
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.languageCodeService.remove(id);
  }
}

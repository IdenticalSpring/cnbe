// src/language-code/language-code.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { languageCode } from './entities/language_code.entity';
import { LanguageCodeController } from './language.controller';
import { LanguageCodeService } from './language.service';

@Module({
  imports: [SequelizeModule.forFeature([languageCode])],
  controllers: [LanguageCodeController],
  providers: [LanguageCodeService],
})
export class LanguageCodeModule {}

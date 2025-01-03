import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntroductionDetailsService } from './introduction_details.service';
import { CreateIntroductionDetailDto } from './dto/create-introduction_detail.dto';
import { UpdateIntroductionDetailDto } from './dto/update-introduction_detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
@Public()
@Controller('introduction-details')
@ApiTags('introduction-details')
@ApiBearerAuth('JWT')
export class IntroductionDetailsController {
  constructor(private readonly introductionDetailsService: IntroductionDetailsService) {}

  @Post()
  create(@Body() createIntroductionDetailDto: CreateIntroductionDetailDto) {
    return this.introductionDetailsService.create(createIntroductionDetailDto);
  }

  @Get()
  findAll() {
    return this.introductionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.introductionDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntroductionDetailDto: UpdateIntroductionDetailDto) {
    return this.introductionDetailsService.update(+id, updateIntroductionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.introductionDetailsService.remove(+id);
  }
}

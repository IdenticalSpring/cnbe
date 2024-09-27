import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IntroductionDetails } from './entities/introduction_detail.entity';
import { CreateIntroductionDetailDto } from './dto/create-introduction_detail.dto';
import { UpdateIntroductionDetailDto } from './dto/update-introduction_detail.dto';


@Injectable()
export class IntroductionDetailsService {
  constructor(
    @InjectModel(IntroductionDetails)
    private readonly introductionDetailsModel: typeof IntroductionDetails,
  ) { }

  async create(createIntroductionDetailDto: CreateIntroductionDetailDto): Promise<IntroductionDetails> {
    return this.introductionDetailsModel.create(createIntroductionDetailDto);
  }

  async findAll(): Promise<IntroductionDetails[]> {
    return this.introductionDetailsModel.findAll();
  }

  async findOne(id: number): Promise<IntroductionDetails> {
    const introductionDetail = await this.introductionDetailsModel.findByPk(id);
    if (!introductionDetail) {
      throw new NotFoundException(`IntroductionDetail with ID ${id} not found`);
    }
    return introductionDetail;
  }

  async update(id: number, updateIntroductionDetailDto: UpdateIntroductionDetailDto): Promise<IntroductionDetails> {
    const introductionDetail = await this.findOne(id);
    await introductionDetail.update(updateIntroductionDetailDto);
    return introductionDetail;
  }

  async remove(id: number): Promise<void> {
    const introductionDetail = await this.findOne(id);
    await introductionDetail.destroy();
  }
}

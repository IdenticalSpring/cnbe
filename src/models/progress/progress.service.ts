import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Progress } from './entities/progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress)
    private progressModel: typeof Progress,
  ) { }


  async create(createProgressDto: any): Promise<Progress> {
    return await this.progressModel.create(createProgressDto);
  }


  async findAll(): Promise<Progress[]> {
    return await this.progressModel.findAll();
  }


  async findOne(id: number): Promise<Progress> {
    return await this.progressModel.findByPk(id);
  }


  async update(id: number, updateProgressDto: any): Promise<[number, Progress[]]> {
    return await this.progressModel.update(updateProgressDto, {
      where: { id },
      returning: true,
    });
  }


  async remove(id: number): Promise<void> {
    const progress = await this.findOne(id);
    if (progress) {
      await progress.destroy();
    }
  }
}

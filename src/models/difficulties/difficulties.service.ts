import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Difficulty } from './entities/difficulties.entites';
import { CreateDifficultyDto } from './dto/create-difficulties.dto';

@Injectable()
export class DifficultiesService {
  constructor(
    @InjectModel(Difficulty)
    private readonly difficultyModel: typeof Difficulty,
  ) {}

  async create(createDifficultyDto: CreateDifficultyDto): Promise<Difficulty> {
    try {
      const newDifficulty =
        await this.difficultyModel.create(createDifficultyDto);
      return newDifficulty;
    } catch (error) {
      throw new HttpException(
        'Failed to create difficulty',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Difficulty[]> {
    try {
      return await this.difficultyModel.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve difficulties',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

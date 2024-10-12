import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Problems } from './entitites/problems.entity';
import { CreateProblemsDto } from './dto/create-problems.dto';
import { UpdateProblemsDto } from './dto/update-problems.dto';

@Injectable()
export class PromblemsService {
  constructor(
    @InjectModel(Problems)
    private exercisesModel: typeof Problems,
  ) {}

  // async create(createExerciseDto: CreateProblemsDto): Promise<Problems> {
  //   return this.exercisesModel.create(createExerciseDto as unknown as Problems);
  // }
  async create(createProblemDto: CreateProblemsDto): Promise<Problems> {
    try {
      const problem = await Problems.create(createProblemDto);
      return problem;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw new InternalServerErrorException('Could not create problem');
    }
  }

  async findAll(): Promise<Problems[]> {
    return this.exercisesModel.findAll();
  }

  async findOne(id: number): Promise<Problems> {
    const exercise = await this.exercisesModel.findByPk(id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateProblemsDto,
  ): Promise<Problems> {
    const exercise = await this.findOne(id);
    await exercise.update(updateExerciseDto);
    return exercise;
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id);
    await exercise.destroy();
  }
}

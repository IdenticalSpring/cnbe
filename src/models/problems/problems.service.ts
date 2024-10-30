import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Problems } from './entitites/problems.entity';
import { CreateProblemsDto } from './dto/create-problems.dto';
import { UpdateProblemsDto } from './dto/update-problems.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PromblemsService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Problems)
    private problemsModel: typeof Problems,
    private configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 20;
  }


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
    return this.problemsModel.findAll();
  }
  async findAllWithPagination(page: number): Promise<{ data: Problems[]; currentPage: number; totalPages: number; totalItems: number }> {
    const limit = parseInt(this.defaultLimit.toString(), 10);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.problemsModel.findAndCountAll({
      offset,
      limit,
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }
  async findOne(id: number): Promise<Problems> {
    const exercise = await this.problemsModel.findByPk(id);
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

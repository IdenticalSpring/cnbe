import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Problems } from './entitites/problems.entity';
import { CreateProblemsDto } from './dto/create-problems.dto';
import { UpdateProblemsDto } from './dto/update-problems.dto';
import { ConfigService } from '@nestjs/config';
import { Companies } from '../companies/entities/companies.entities';
import { Topics } from '../topics/entities/topics.entities';

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
      const problem = await this.problemsModel.create(createProblemDto);

      if (createProblemDto.companyIds) {
        const companies = await Companies.findAll({ where: { id: createProblemDto.companyIds } });
        await problem.$set('companies', companies);
      }

      if (createProblemDto.topicIds) {
        const topics = await Topics.findAll({ where: { id: createProblemDto.topicIds } });
        await problem.$set('topics', topics);
      }

      return problem;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw new InternalServerErrorException('Could not create problem');
    }
  }

  async update(id: number, updateProblemDto: UpdateProblemsDto): Promise<Problems> {
    const problem = await this.findOne(id);
    await problem.update(updateProblemDto);

    if (updateProblemDto.companyIds) {
      const companies = await Companies.findAll({ where: { id: updateProblemDto.companyIds } });
      await problem.$set('companies', companies);
    }

    if (updateProblemDto.topicIds) {
      const topics = await Topics.findAll({ where: { id: updateProblemDto.topicIds } });
      await problem.$set('topics', topics);
    }

    return problem;
  }
  async findAll(): Promise<Problems[]> {
    return this.problemsModel.findAll({
      include: [Companies, Topics],
    });
  }

  async findAllWithPagination(page: number): Promise<{ data: Problems[]; currentPage: number; totalPages: number; totalItems: number }> {
    const limit = parseInt(this.defaultLimit.toString(), 10);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.problemsModel.findAndCountAll({
      offset,
      limit,
      include: [Companies, Topics], 
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }

  async findOne(id: number): Promise<Problems> {
    const problem = await this.problemsModel.findByPk(id, {
      include: [Companies, Topics], 
    });
    if (!problem) {
      throw new NotFoundException(`Problem with ID ${id} not found`);
    }
    return problem;
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id);
    await exercise.destroy();
  }
  async findByDifficulty(
    difficultyId: number,
  ): Promise<{ data: Problems[]; totalItems: number }> {
    const { rows, count } = await this.problemsModel.findAndCountAll({
      where: { difficultyId },
    });

    return {
      data: rows,
      totalItems: count,
    };
  }

  async findByTitle(
    title: string,
  ): Promise<{ data: Problems[]; totalItems: number }> {
    const { rows, count } = await this.problemsModel.findAndCountAll({
      where: { title: { [Op.like]: `%${title}%` } },
    });

    return {
      data: rows,
      totalItems: count,
    };
  }
  async findByTopic(topicId: number): Promise<{ data: Problems[]; totalItems: number }> {
    const { rows, count } = await this.problemsModel.findAndCountAll({
      include: [{
        model: Topics,
        where: { id: topicId },
      }],
    });

    return {
      data: rows,
      totalItems: count,
    };
  }

  async findByCompany(companyId: number): Promise<{ data: Problems[]; totalItems: number }> {
    const { rows, count } = await this.problemsModel.findAndCountAll({
      include: [{
        model: Companies,
        where: { id: companyId },
      }],
    });

    return {
      data: rows,
      totalItems: count,
    };
  }
  async findByDifficultyAndTopic(difficultyId?: number, topicId?: number): Promise<{ data: Problems[]; totalItems: number }> {
    const conditions: any = {};
    if (difficultyId) {
      conditions.difficultyId = difficultyId;
    }

    const include: any[] = [];
    if (topicId) {
      include.push({
        model: Topics,
        where: { id: topicId },
      });
    }

    const { rows, count } = await this.problemsModel.findAndCountAll({
      where: conditions,
      include,
    });

    return {
      data: rows,
      totalItems: count,
    };
  }
}

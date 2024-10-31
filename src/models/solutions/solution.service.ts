import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Solutions } from './entities/solution.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SolutionService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Solutions)
    private readonly solutionModel: typeof Solutions,
    private readonly configService: ConfigService, 
  ) { 
    this.defaultLimit = parseInt(this.configService.get<string>('DEFAULT_LIMIT'), 10) || 20;
  }

  async createSolution(createSolutionDto: CreateSolutionDto): Promise<Solutions> {
    return this.solutionModel.create(createSolutionDto);
  }

  async findAllSolutions(): Promise<Solutions[]> {
    return this.solutionModel.findAll();
  }

  async findAllWithPagination(page: number = 1): Promise<{
    data: Solutions[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const limit = this.defaultLimit;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.solutionModel.findAndCountAll({
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

  async findSolutionById(id: number): Promise<Solutions> {
    return this.solutionModel.findByPk(id);
  }

  async updateSolution(id: number, updateSolutionDto: UpdateSolutionDto): Promise<[number, Solutions[]]> {
    return this.solutionModel.update(updateSolutionDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteSolution(id: number): Promise<void> {
    const solution = await this.findSolutionById(id);
    if (solution) await solution.destroy();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Solutions } from './entities/solution.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionService {
  constructor(
    @InjectModel(Solutions)
    private readonly solutionModel: typeof Solutions,
  ) { }

  async createSolution(createSolutionDto: CreateSolutionDto): Promise<Solutions> {
    return this.solutionModel.create(createSolutionDto);
  }

  async findAllSolutions(): Promise<Solutions[]> {
    return this.solutionModel.findAll();
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

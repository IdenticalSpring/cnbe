import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SolutionComments } from './entities/solution_comment.entity';
import { CreateSolutionCommentDto } from './dto/create-solution_comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution_comment.dto';


@Injectable()
export class SolutionCommentService {
  constructor(
    @InjectModel(SolutionComments)
    private readonly solutionCommentModel: typeof SolutionComments,
  ) { }

  async createSolutionComment(createSolutionCommentDto: CreateSolutionCommentDto): Promise<SolutionComments> {
    return this.solutionCommentModel.create(createSolutionCommentDto);
  }

  async findAllSolutionComments(): Promise<SolutionComments[]> {
    return this.solutionCommentModel.findAll();
  }

  async findSolutionCommentById(id: number): Promise<SolutionComments> {
    return this.solutionCommentModel.findByPk(id);
  }

  async updateSolutionComment(id: number, updateSolutionCommentDto: UpdateSolutionCommentDto): Promise<[number, SolutionComments[]]> {
    return this.solutionCommentModel.update(updateSolutionCommentDto, {
      where: { id },
      returning: true, 
    });
  }

  async deleteSolutionComment(id: number): Promise<void> {
    const comment = await this.findSolutionCommentById(id);
    if (comment) await comment.destroy();
  }
}

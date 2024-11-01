import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SolutionComments } from './entities/solution_comment.entity';
import { CreateSolutionCommentDto } from './dto/create-solution_comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution_comment.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SolutionCommentService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(SolutionComments)
    private readonly solutionCommentModel: typeof SolutionComments,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = Number(this.configService.get<number>('DEFAULT_LIMIT')) || 20;
  }

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
  async findRootComments(page: number = 1): Promise<{
    data: SolutionComments[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const limit = this.defaultLimit;
    const offset = (page - 1) * limit;

    console.log(`Executing root comments query with limit: ${limit}, offset: ${offset}`); 

    const { rows, count } = await this.solutionCommentModel.findAndCountAll({
      where: { isReplied: 0 },
      limit: Number(limit),
      offset: Number(offset),
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }



  async findRepliesForComment(commentId: number, page: number = 1): Promise<{
    data: SolutionComments[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    if (!Number.isInteger(commentId)) {
      throw new BadRequestException('Comment ID must be a valid integer');
    }

    const limit = this.defaultLimit;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.solutionCommentModel.findAndCountAll({
      where: { repliedToCommentId: commentId },
      limit: Number(limit),  // Đảm bảo limit là số nguyên
      offset: Number(offset), // Đảm bảo offset là số nguyên
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }
}

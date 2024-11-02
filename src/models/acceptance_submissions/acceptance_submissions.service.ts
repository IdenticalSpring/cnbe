import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AcceptanceSubmission } from './entities/acceptance_submissions.entity';
import { CreateAcceptanceSubmissionDto } from './dto/create-acceptance_submission.dto';
import { UpdateAcceptanceSubmissionDto } from './dto/update-acceptance_submission.dto';

@Injectable()
export class AcceptanceSubmissionsService {
  constructor(
    @InjectModel(AcceptanceSubmission)
    private acceptanceSubmissionModel: typeof AcceptanceSubmission,
  ) {}

  // Create a new acceptance submission
  async create(
    createDto: CreateAcceptanceSubmissionDto,
  ): Promise<AcceptanceSubmission> {
    // Casting createDto as Partial<AcceptanceSubmission> to avoid TypeScript type issues
    return await this.acceptanceSubmissionModel.create({
      ...createDto,
    } as Partial<AcceptanceSubmission>);
  }

  // Find all acceptance submissions
  async findAll(): Promise<AcceptanceSubmission[]> {
    return await this.acceptanceSubmissionModel.findAll();
  }

  // Find one acceptance submission by ID
  async findOne(id: number): Promise<AcceptanceSubmission> {
    const submission = await this.acceptanceSubmissionModel.findByPk(id);
    if (!submission) {
      throw new NotFoundException(
        `AcceptanceSubmission with ID #${id} not found`,
      );
    }
    return submission;
  }

  // Update an acceptance submission by ID
  async update(
    id: number,
    updateDto: UpdateAcceptanceSubmissionDto,
  ): Promise<AcceptanceSubmission> {
    const submission = await this.findOne(id);
    // Update with new data from UpdateAcceptanceSubmissionDto
    return await submission.update({ ...updateDto });
  }

  // Remove an acceptance submission by ID
  async remove(id: number): Promise<void> {
    const submission = await this.findOne(id);
    await submission.destroy();
  }
}

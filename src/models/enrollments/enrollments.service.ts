// enrollments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './entities/enrollments.entity';
import { CreateEnrollmentsDto } from './dto/create-enrollments';
import { UpdateEnrollmentsDto } from './dto/update-enrollments';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment)
    private enrollmentModel: typeof Enrollment,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentsDto): Promise<Enrollment> {
    return this.enrollmentModel.create(
      createEnrollmentDto as unknown as Enrollment,
    );
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.findAll();
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentModel.findByPk(id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return enrollment;
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentsDto,
  ): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    await enrollment.update(updateEnrollmentDto);
    return enrollment;
  }

  async remove(id: number): Promise<void> {
    const enrollment = await this.findOne(id);
    await enrollment.destroy();
  }
}

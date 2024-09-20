import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Exercises } from './entitites/exercises.entity';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercises)
    private exercisesModel: typeof Exercises,
  ) {}

  async create(createExerciseDto: CreateExercisesDto): Promise<Exercises> {
    return this.exercisesModel.create(
      createExerciseDto as unknown as Exercises,
    );
  }

  async findAll(): Promise<Exercises[]> {
    return this.exercisesModel.findAll();
  }

  async findOne(id: number): Promise<Exercises> {
    const exercise = await this.exercisesModel.findByPk(id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExercisesDto,
  ): Promise<Exercises> {
    const exercise = await this.findOne(id);
    await exercise.update(updateExerciseDto);
    return exercise;
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id);
    await exercise.destroy();
  }
}

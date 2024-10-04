import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses)
    private coursesModel: typeof Courses,
  ) {}

  async create(createCoursesDto: CreateCoursesDto): Promise<Courses> {
    return this.coursesModel.create(createCoursesDto as unknown as Courses);
  }

  async findAll(): Promise<Courses[]> {
    return this.coursesModel.findAll();
  }

  async findOne(id: number): Promise<Courses> {
    const course = await this.coursesModel.findByPk(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const course = await this.findOne(id);
    await course.update(updateCourseDto);
    return course;
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await course.destroy();
  }
  async findPaginated(page: number, limit: number = 10): Promise<Courses[]> {
    const offset = (page - 1) * limit;
    return this.coursesModel.findAll({
      limit,
      offset,
    });
  }
}

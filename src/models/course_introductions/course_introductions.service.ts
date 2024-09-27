import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseIntroductions } from './entities/course_introduction.entity';
import { CreateCourseIntroductionDto } from './dto/create-course_introduction.dto';
import { UpdateCourseIntroductionDto } from './dto/update-course_introduction.dto';


@Injectable()
export class CourseIntroductionsService {
  constructor(
    @InjectModel(CourseIntroductions)
    private readonly courseIntroductionsModel: typeof CourseIntroductions,
  ) { }

  async create(createCourseIntroductionDto: CreateCourseIntroductionDto): Promise<CourseIntroductions> {
    return this.courseIntroductionsModel.create(createCourseIntroductionDto);
  }

  async findAll(): Promise<CourseIntroductions[]> {
    return this.courseIntroductionsModel.findAll();
  }

  async findOne(id: number): Promise<CourseIntroductions> {
    const courseIntroduction = await this.courseIntroductionsModel.findByPk(id);
    if (!courseIntroduction) {
      throw new NotFoundException(`CourseIntroduction with ID ${id} not found`);
    }
    return courseIntroduction;
  }

  async update(id: number, updateCourseIntroductionDto: UpdateCourseIntroductionDto): Promise<CourseIntroductions> {
    const courseIntroduction = await this.findOne(id);
    await courseIntroduction.update(updateCourseIntroductionDto);
    return courseIntroduction;
  }

  async remove(id: number): Promise<void> {
    const courseIntroduction = await this.findOne(id);
    await courseIntroduction.destroy();
  }
}

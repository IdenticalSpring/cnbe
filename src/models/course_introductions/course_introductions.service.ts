import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseIntroductions } from './entities/course_introduction.entity';
import { CreateCourseIntroductionDto } from './dto/create-course_introduction.dto';
import { UpdateCourseIntroductionDto } from './dto/update-course_introduction.dto';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { IntroductionDetails } from 'src/models/introduction_details/entities/introduction_detail.entity';

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
    return this.courseIntroductionsModel.findAll({
      include: [Courses, IntroductionDetails], // Include để lấy thông tin liên quan
    });
  }

  async findOne(id: number): Promise<CourseIntroductions> {
    const courseIntroduction = await this.courseIntroductionsModel.findByPk(id, {
      include: [Courses, IntroductionDetails], // Include để lấy thông tin liên quan
    });
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

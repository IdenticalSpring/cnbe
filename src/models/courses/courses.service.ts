import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoursesService {
  private readonly defaultLimit: number;
  constructor(
    @InjectModel(Courses)
    private coursesModel: typeof Courses,
    private configService: ConfigService,
    
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 20;
  }

  async create(createCoursesDto: CreateCoursesDto): Promise<Courses> {
    try {
      return await this.coursesModel.create(createCoursesDto as unknown as Courses);
    } catch (error) {
      throw new BadRequestException('Failed to create course');
    }
  }

  async findAll(): Promise<Courses[]> {
    try {
      return await this.coursesModel.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to fetch courses');
    }
  }

  async findOne(id: number): Promise<Courses> {
    try {
      if (!id || isNaN(id)) {
        throw new BadRequestException('Invalid course ID');
      }

      const course = await this.coursesModel.findByPk(id);
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return course;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch course');
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    try {
      const course = await this.findOne(id);
      await course.update(updateCourseDto);
      return course;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update course');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const course = await this.findOne(id);
      await course.destroy();
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete course');
    }
  }
  async findAllWithPagination(page: number = 1): Promise<{ data: Courses[], currentPage: number, totalPages: number, totalItems: number }> {
  
    const pageNumber = Math.max(1, Number(page) || 1);
    const limit = Number(this.configService.get<number>('DEFAULT_LIMIT')) || 20; 
    const offset = (pageNumber - 1) * limit;

    const { rows, count } = await this.coursesModel.findAndCountAll({
      limit,
      offset,
    });

    return {
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }


}
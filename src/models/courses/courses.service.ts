import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ConfigService } from '@nestjs/config';
import { Types } from '../type/entities/types.entity';

@Injectable()
export class CoursesService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Courses)
    private coursesModel: typeof Courses,
    private configService: ConfigService,
    @InjectModel(Types) private typesModel: typeof Types,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 20;
  }

  async create(createCoursesDto: CreateCoursesDto): Promise<Courses> {
    const { types, ...courseData } = createCoursesDto;
    const course = await this.coursesModel.create(courseData as Courses);

    if (types && types.length > 0) {
      const typeInstances = await this.typesModel.findAll({
        where: { name: types },
      });
      await course.$set('types', typeInstances);
    }

    return course;
  }

  async findAll(): Promise<Courses[]> {
    return await this.coursesModel.findAll({ include: { model: Types } });
  }

  async findOne(id: number): Promise<Courses> {
    const course = await this.coursesModel.findByPk(id, { include: { model: Types } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const { types, ...courseData } = updateCourseDto;
    const course = await this.findOne(id);

    await course.update(courseData);

    if (types && types.length > 0) {
      const typeInstances = await this.typesModel.findAll({
        where: { name: types },
      });
      await course.$set('types', typeInstances);
    }

    return course;
  }

  async getByType(typeName: string, page: number = 1): Promise<{ data: Courses[]; currentPage: number; totalPages: number; totalItems: number }> {
    const limit = this.defaultLimit;
    const offset = (page - 1) * limit;

    const type = await this.typesModel.findOne({
      where: { name: typeName },
      include: { model: Courses },
    });

    if (!type) {
      throw new NotFoundException(`Type '${typeName}' not found`);
    }

    const courses = type.courses.slice(offset, offset + limit);
    const totalItems = type.courses.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: courses,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await course.destroy();
  }

  async findAllWithPagination(page: number = 1): Promise<{ data: Courses[], currentPage: number, totalPages: number, totalItems: number }> {
    const limit = Number(this.defaultLimit);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.coursesModel.findAndCountAll({
      limit: limit,
      offset: offset,
      include: { model: Types }, 
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      currentPage: page,
      totalPages,
      totalItems: count,
    };
  }


}

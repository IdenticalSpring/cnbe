import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private coursesModel;
    constructor(coursesModel: typeof Courses);
    create(createCoursesDto: CreateCoursesDto): Promise<Courses>;
    findAll(): Promise<Courses[]>;
    findOne(id: number): Promise<Courses>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses>;
    remove(id: number): Promise<void>;
}

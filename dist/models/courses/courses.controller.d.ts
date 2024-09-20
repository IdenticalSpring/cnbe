import { CoursesService } from './courses.service';
import { Courses } from './entities/courses.entity';
import { CreateCoursesDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<Courses[]>;
    create(createCoursesDto: CreateCoursesDto): Promise<Courses>;
    findOne(id: string): Promise<Courses>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Courses>;
    remove(id: string): Promise<void>;
}

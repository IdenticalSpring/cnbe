import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './entities/enrollments.entity';
import { UpdateEnrollmentsDto } from './dto/update-enrollments';
import { CreateEnrollmentsDto } from './dto/create-enrollments';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    findAll(): Promise<Enrollment[]>;
    create(createEnrollmentDto: CreateEnrollmentsDto): Promise<Enrollment>;
    findOne(id: string): Promise<Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentsDto): Promise<Enrollment>;
    remove(id: string): Promise<void>;
}

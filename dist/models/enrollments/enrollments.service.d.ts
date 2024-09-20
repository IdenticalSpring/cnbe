import { Enrollment } from './entities/enrollments.entity';
import { CreateEnrollmentsDto } from './dto/create-enrollments';
import { UpdateEnrollmentsDto } from './dto/update-enrollments';
export declare class EnrollmentsService {
    private enrollmentModel;
    constructor(enrollmentModel: typeof Enrollment);
    create(createEnrollmentDto: CreateEnrollmentsDto): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findOne(id: number): Promise<Enrollment>;
    update(id: number, updateEnrollmentDto: UpdateEnrollmentsDto): Promise<Enrollment>;
    remove(id: number): Promise<void>;
}

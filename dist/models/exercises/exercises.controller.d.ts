import { ExercisesService } from './exercises.service';
import { Exercises } from './entitites/exercises.entity';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    findAll(): Promise<Exercises[]>;
    create(createExerciseDto: CreateExercisesDto): Promise<Exercises>;
    findOne(id: string): Promise<Exercises>;
    update(id: string, updateExerciseDto: UpdateExercisesDto): Promise<Exercises>;
    remove(id: string): Promise<void>;
}

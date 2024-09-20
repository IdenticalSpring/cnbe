import { Exercises } from './entitites/exercises.entity';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';
export declare class ExercisesService {
    private exercisesModel;
    constructor(exercisesModel: typeof Exercises);
    create(createExerciseDto: CreateExercisesDto): Promise<Exercises>;
    findAll(): Promise<Exercises[]>;
    findOne(id: number): Promise<Exercises>;
    update(id: number, updateExerciseDto: UpdateExercisesDto): Promise<Exercises>;
    remove(id: number): Promise<void>;
}

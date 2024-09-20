import { Process } from './entities/process.entity';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
export declare class ProcessService {
    private processModel;
    constructor(processModel: typeof Process);
    create(createProcessDto: CreateProcessDto): Promise<Process>;
    findAll(): Promise<Process[]>;
    findOne(id: number): Promise<Process>;
    update(id: number, updateProcessDto: UpdateProcessDto): Promise<Process>;
    remove(id: number): Promise<void>;
}

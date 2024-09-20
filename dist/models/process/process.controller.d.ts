import { ProcessService } from './process.service';
import { Process } from './entities/process.entity';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
export declare class ProcessController {
    private readonly processService;
    constructor(processService: ProcessService);
    findAll(): Promise<Process[]>;
    create(createProcessDto: CreateProcessDto): Promise<Process>;
    findOne(id: string): Promise<Process>;
    update(id: string, updateProcessDto: UpdateProcessDto): Promise<Process>;
    remove(id: string): Promise<void>;
}

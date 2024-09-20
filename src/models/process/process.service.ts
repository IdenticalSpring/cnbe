// process.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Process } from './entities/process.entity';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel(Process)
    private processModel: typeof Process,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processModel.create(createProcessDto as unknown as Process);
  }

  async findAll(): Promise<Process[]> {
    return this.processModel.findAll();
  }

  async findOne(id: number): Promise<Process> {
    const process = await this.processModel.findByPk(id);
    if (!process) {
      throw new NotFoundException(`Process with ID ${id} not found`);
    }
    return process;
  }

  async update(
    id: number,
    updateProcessDto: UpdateProcessDto,
  ): Promise<Process> {
    const process = await this.findOne(id);
    await process.update(updateProcessDto);
    return process;
  }

  async remove(id: number): Promise<void> {
    const process = await this.findOne(id);
    await process.destroy();
  }
}

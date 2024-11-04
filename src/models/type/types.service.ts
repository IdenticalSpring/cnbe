import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Types } from './entities/types.entity';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypesService {
    constructor(
        @InjectModel(Types)
        private typesModel: typeof Types,
    ) { }

    async create(createTypeDto: CreateTypeDto): Promise<Types> {
        return this.typesModel.create(createTypeDto);
    }

    async findAll(): Promise<Types[]> {
        return this.typesModel.findAll();
    }
}

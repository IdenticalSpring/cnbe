import { Controller, Get, Post, Body } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Types } from './entities/types.entity';
import { Public } from 'src/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';
@Public()
@ApiTags('types')
@Controller('types')
export class TypesController {
    constructor(private readonly typesService: TypesService) { }

    @Post()
    create(@Body() createTypeDto: CreateTypeDto): Promise<Types> {
        return this.typesService.create(createTypeDto);
    }

    @Get()
    findAll(): Promise<Types[]> {
        return this.typesService.findAll();
    }
}

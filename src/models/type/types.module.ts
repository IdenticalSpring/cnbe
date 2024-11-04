
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Types } from './entities/types.entity';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

@Module({
    imports: [SequelizeModule.forFeature([Types])],
    controllers: [TypesController],
    providers: [TypesService],
    exports: [SequelizeModule],
})
export class TypesModule { }

// tag.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './entities/tags.entity';
import { CreateTagDto } from './dto/create-tags.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagModel.create(createTagDto);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  async findOne(id: number): Promise<Tag> {
    return this.tagModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    if (tag) {
      await tag.destroy();
    }
  }
}

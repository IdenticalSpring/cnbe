import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AcceptanceSubmissionsService } from './acceptance_submissions.service';
import { CreateAcceptanceSubmissionDto } from './dto/create-acceptance_submission.dto';
import { UpdateAcceptanceSubmissionDto } from './dto/update-acceptance_submission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('acceptance-submissions') // Để nhóm các API endpoints liên quan đến submission
@Controller('acceptance-submissions')
@ApiBearerAuth('JWT')
export class AcceptanceSubmissionsController {
  constructor(private readonly service: AcceptanceSubmissionsService) {}

  @Post()
  create(@Body() createDto: CreateAcceptanceSubmissionDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAcceptanceSubmissionDto,
  ) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

import { Body, Controller, Get, Param, Patch, Post, UseGuards,Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/passport/jwt-auth.guard";
import { RolesGuard } from "src/auth/passport/roles.guard";
import { Roles } from "src/decorator/admin.decorator";
import { CreateProblemsDto } from "src/models/problems/dto/create-problems.dto";
import { UpdateProblemsDto } from "src/models/problems/dto/update-problems.dto";
import { Problems } from "src/models/problems/entitites/problems.entity";
import { PromblemsService } from "src/models/problems/problems.service";



@ApiTags('admin/problem')
@Controller('admin/problem')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
@Roles('admin')
export class AdminProblemController {
    constructor(private readonly problemsService: PromblemsService) { }

    @Get('all')
    @ApiOperation({ summary: 'Retrieve all problems' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved all problems without pagination.',
    })
    getAllProblems(): Promise<Problems[]> {
        return this.problemsService.findAll();
    }

    @Get('paginated')
    @ApiOperation({ summary: 'Retrieve problems with pagination' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved problems with pagination.',
    })
    getPaginatedProblems(@Query('page') page: number = 1) {
        return this.problemsService.findAllWithPagination(page);
    }

    @Post('create')
    @ApiOperation({ summary: 'Create a new problem' })
    @ApiResponse({
        status: 201,
        description: 'The problem has been successfully created.',
    })
    createProblem(@Body() createProblemDto: CreateProblemsDto): Promise<Problems> {
        return this.problemsService.create(createProblemDto);
    }

    @Get('detail/:id')
    @ApiOperation({ summary: 'Retrieve a specific problem by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved the specified problem.',
    })
    getProblemById(@Param('id') id: string): Promise<Problems> {
        return this.problemsService.findOne(+id);
    }

    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an existing problem' })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated the specified problem.',
    })
    updateProblem(
        @Param('id') id: string,
        @Body() updateProblemDto: UpdateProblemsDto,
    ): Promise<Problems> {
        return this.problemsService.update(+id, updateProblemDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a specific problem by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully deleted the specified problem.',
    })
    deleteProblem(@Param('id') id: string): Promise<void> {
        return this.problemsService.remove(+id);
    }
}

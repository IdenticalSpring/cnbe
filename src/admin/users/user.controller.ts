import { Controller, Get, Param, Post, Body, UseGuards, Put, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/models/users/dto/update-user.dto';
import { UsersService } from 'src/models/users/users.service';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard) 
@ApiBearerAuth('JWT')
export class AdminUsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('list')
    @Roles('admin')
    async findAllUsers() {
        return this.usersService.findAll();
    }

    @Get('detail/:id')
    @Roles('admin')
    async findUserById(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('delete/:id')
    async removeUser(@Param('id') id: number) {
        return this.usersService.removeUser(id);
    }
    @Get(`getPagination`)
    @Roles('admin')
    @ApiQuery({ name: 'page', required: false, example: 1 })
    async findAllWithPagination(
        @Query('page') page = 1,
    ) {
        return this.usersService.findAllWithPagination(page);
    }
}

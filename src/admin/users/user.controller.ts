import { Controller, Get, Param, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { Roles } from 'src/decorator/admin.decorator';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/models/users/dto/update-user.dto';
import { UsersService } from 'src/models/users/users.service';

@ApiTags('admin/users')
@Controller('admin/users')
@UseGuards(RolesGuard)
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
}

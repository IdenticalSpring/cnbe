import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLES_KEY } from 'src/decorator/admin.decorator';

@Injectable()
export class RolesGuard implements CanActivate { 
    constructor(
        private reflector: Reflector,
        private jwtAuthGuard: JwtAuthGuard 
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

        if (!roles) {
            return true;  
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Kiểm tra xem user có tồn tại không
        if (!user) {
            throw new UnauthorizedException('Không có thông tin người dùng trong yêu cầu');
        }

        // Kiểm tra quyền (role)
        const hasRole = roles.some(role => user.role === role);

        if (!hasRole) {
            throw new ForbiddenException('Bạn không có quyền truy cập');
        }

        return true;
    }

}

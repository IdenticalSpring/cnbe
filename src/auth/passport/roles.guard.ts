import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
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
    
        const isJwtValid = await this.jwtAuthGuard.canActivate(context);

        if (!isJwtValid) {
            return false;
        }

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true; 
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;


        
        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException('Bạn không có quyền truy cập.');
        }

        return hasRole;
    }
}

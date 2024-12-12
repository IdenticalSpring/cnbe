import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Nếu route là công khai, không cần xác thực
        if (isPublic) {
            return true;
        }

        // Nếu không phải công khai, tiến hành xác thực JWT
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        // Nếu có lỗi hoặc không có user, ném UnauthorizedException
        if (err || !user) {
            throw err || new UnauthorizedException("Access token không hợp lệ hoặc không truyền lên");
        }

        // Gán thông tin người dùng vào request
        const request = context.switchToHttp().getRequest();
        request.user = user;  // Chắc chắn rằng user đã được gán vào request

        return user;
    }

}

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from 'src/models/orders/orders.service';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CourseAccessGuard implements CanActivate {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // Lấy token từ header Authorization
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token is missing');
        }

        const token = authHeader.split(' ')[1];

        try {
            // Giải mã và xác thực token
            const secret = process.env.JWT_SECRET_KEY;
            const decoded = jwt.verify(token, secret) as any;

            // Gắn thông tin user vào request để các phần khác có thể sử dụng
            request.user = {
                userId: decoded.sub,
                username: decoded.username,
                role: decoded.role,
            };

            console.log('User after JWT verification:', request.user);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        // Lấy user và kiểm tra quyền truy cập dựa trên userId
        const user = request.user;
        const courseId = request.params.courseId;
        console.log(courseId)
        if (!user || !user.userId) {
            throw new UnauthorizedException('Invalid token');
        }

        // Kiểm tra xem người dùng đã mua khóa học này chưa
        const hasPurchased = await this.ordersService.findOrderByUserAndCourse(user.userId, +courseId);
        if (!hasPurchased) {
            throw new UnauthorizedException('You must purchase this course to access it');
        }

        return true;
    }
}

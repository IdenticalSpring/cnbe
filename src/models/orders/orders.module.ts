import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from './entities/orders.entites';
import { CouponsModule } from '../coupons/coupons.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [SequelizeModule.forFeature([Orders]), CouponsModule,CoursesModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

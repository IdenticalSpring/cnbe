import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from './entities/orders.entites';
import { CouponsModule } from '../coupons/coupons.module';
import { CoursesModule } from '../courses/courses.module';
import { PayOSModule } from '../payos/payos.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Orders]),
    CouponsModule,
    forwardRef(() => CoursesModule),
    forwardRef(() => PayOSModule) 
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService], 
})
export class OrdersModule { }

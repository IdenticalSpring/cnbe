import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from './entities/orders.entites';
import { CouponsModule } from '../coupons/coupons.module';

@Module({
  imports: [SequelizeModule.forFeature([Orders]), CouponsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

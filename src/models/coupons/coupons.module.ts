import { SequelizeModule } from '@nestjs/sequelize';
import { CouponsController } from './coupons.controller';
import { Coupons } from './entities/coupons.entites';
import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Module({
  imports: [SequelizeModule.forFeature([Coupons])],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}

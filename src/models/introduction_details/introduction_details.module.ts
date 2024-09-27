import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IntroductionDetails } from './entities/introduction_detail.entity';
import { IntroductionDetailsService } from './introduction_details.service';
import { IntroductionDetailsController } from './introduction_details.controller';



@Module({
  imports: [SequelizeModule.forFeature([IntroductionDetails])],
  controllers:[IntroductionDetailsController],
  providers: [IntroductionDetailsService],
  exports: [IntroductionDetailsService],
})
export class IntroductionDetailsModule { }

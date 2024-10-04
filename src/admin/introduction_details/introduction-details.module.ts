import { Module } from '@nestjs/common';
import { AdminIntroductionDetailsController } from './introduction-details.controller';
import { IntroductionDetailsModule } from 'src/models/introduction_details/introduction_details.module';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Module({
    imports: [IntroductionDetailsModule], 
    controllers: [AdminIntroductionDetailsController],
    providers: [RolesGuard, JwtAuthGuard], 
})
export class AdminIntroductionDetailsModule { }

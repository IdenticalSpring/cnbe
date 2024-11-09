import { Module, forwardRef } from '@nestjs/common';
import { PayOSService } from './payos.service';
import { PayOSController } from './payos.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [
        forwardRef(() => OrdersModule) 
    ],
    controllers: [PayOSController],
    providers: [PayOSService],
    exports: [PayOSService],
})
export class PayOSModule { }

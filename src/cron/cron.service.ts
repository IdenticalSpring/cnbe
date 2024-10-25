import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class CronService {
    @Cron('*/3 * * * *')
    async keepAlive() {
        try {
            await axios.get('https://cnbe.onrender.com/api/v1/ping');
            console.log('Ping success');
        } catch (error) {
            console.error('Ping error:', error.message);
        }
    }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './models/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransformInterceptor } from './core/transform.interceptor';
import { Courses } from './models/courses/entities/courses.entity';
import { Exercises } from './models/exercises/entitites/exercises.entity';
import { Process } from './models/process/entities/process.entity';
import { Enrollment } from './models/enrollments/entities/enrollments.entity';
import { CoursesModule } from './models/courses/courses.module';
import { ExercisesModule } from './models/exercises/exercises.module';
import { ProcessModule } from './models/process/process.module';
import { EnrollmentModule } from './models/enrollments/enrollments.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './models/cloudinary/cloudinary.module';

@Module({
  imports: [
    MulterModule.register({ dest: './images/' }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [User, Courses, Exercises, Process, Enrollment],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <' + configService.get<string>('MAIL_USER') + '>',
        },
        template: {
          dir: process.cwd() + '/src/mail/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    ExercisesModule,
    ProcessModule,
    EnrollmentModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}

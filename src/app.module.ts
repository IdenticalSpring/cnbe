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
import { Problems } from './models/problems/entitites/problems.entity';
import { Process } from './models/process/entities/process.entity';
import { Enrollment } from './models/enrollments/entities/enrollments.entity';
import { CoursesModule } from './models/courses/courses.module';
import { ProblemsModule } from './models/problems/problems.module';
import { ProcessModule } from './models/process/process.module';
import { EnrollmentModule } from './models/enrollments/enrollments.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './models/cloudinary/cloudinary.module';
import { AdminCoursesController } from './admin/courses/courses.controller';
import { AdminCoursesModule } from './admin/courses/courses.module';
import { Orders } from './models/orders/entities/orders.entites';
import { OrdersModule } from './models/orders/orders.module';
import { Coupons } from './models/coupons/entities/coupons.entites';
import { CouponsModule } from './models/coupons/coupons.module';
import { SubmissionModule } from './models/submission/submission.module';
import { Submission } from './models/submission/entities/submission.model';
import { CourseIntroductions } from './models/course_introductions/entities/course_introduction.entity';
import { IntroductionDetails } from './models/introduction_details/entities/introduction_detail.entity';
import { CourseIntroductionsModule } from './models/course_introductions/course_introductions.module';
import { IntroductionDetailsModule } from './models/introduction_details/introduction_details.module';
import { AdminCourseIntroductionsController } from './admin/course_introductions/course-introductions.controller';
import { AdminIntroductionDetailsController } from './admin/introduction_details/introduction-details.controller';
import { AdminCourseIntroductionsModule } from './admin/course_introductions/course-introductions.module';
import { AdminIntroductionDetailsModule } from './admin/introduction_details/introduction-details.module';
import { AdminUserModule } from './admin/users/user.module';
import { Difficulty } from './models/difficulties/entities/difficulties.entites';
import { ProblemCompanies } from './models/problems_companies/entities/problems_companies.entits';
import { Companies } from './models/companies/entities/companies.entities';
import { CompaniesModule } from './models/companies/companies.module';
import { DifficultiesModule } from './models/difficulties/difficulties.module';
import { ProblemCompaniesModule } from './models/problems_companies/pb_com.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { AdminProblemModule } from './admin/problem/problem.module';
import { Topics } from './models/topics/entities/topics.entities';
import { TopicsModule } from './models/topics/topics.module';
import { ProblemTopics } from './models/problems_topics/entities/problems_topics.entities';
import { ProblemTopicsModule } from './models/problems_topics/problems_topics.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
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
        models: [
          User,
          Courses,
          Problems,
          Process,
          Enrollment,
          Orders,
          Topics,
          ProblemTopics,
          Difficulty,
          ProblemCompanies,
          Companies,
          Coupons,
          Submission,
          CourseIntroductions,
          IntroductionDetails,
        ],
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
    TopicsModule,
    ProblemTopicsModule,
    CoursesModule,
    ProblemsModule,
    ProcessModule,
    CouponsModule,
    EnrollmentModule,
    CloudinaryModule,
    OrdersModule,
    DifficultiesModule,
    ProblemCompaniesModule,
    CompaniesModule,
    SubmissionModule,
    AdminCoursesModule,
    CourseIntroductionsModule,
    IntroductionDetailsModule,
    AdminCourseIntroductionsModule,
    AdminIntroductionDetailsModule,
    AdminUserModule,
    AdminProblemModule,
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
    CronService,
  ],
})
export class AppModule {}

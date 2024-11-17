import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// Import các controller và service
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import { CronService } from './cron/cron.service';

// Import các module người dùng
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminUserModule } from './admin/users/user.module';

// Import các module liên quan đến khóa học
import { CoursesModule } from './models/courses/courses.module';
import { AdminCoursesModule } from './admin/courses/courses.module';
import { CourseIntroductionsModule } from './models/course_introductions/course_introductions.module';
import { IntroductionDetailsModule } from './models/introduction_details/introduction_details.module';
import { AdminCourseIntroductionsModule } from './admin/course_introductions/course-introductions.module';
import { AdminIntroductionDetailsModule } from './admin/introduction_details/introduction-details.module';

// Import các module liên quan đến bài tập và thử thách
import { ProblemsModule } from './models/problems/problems.module';
import { ProcessModule } from './models/process/process.module';
import { SubmissionModule } from './models/submission/submission.module';
import { SolutionModule } from './models/solutions/solution.module';
import { SolutionCommentsModule } from './models/solution_comments/solution_comments.module';
import { AcceptanceSubmissionsModule } from './models/acceptance_submissions/acceptance_submissions.module';
import { TopicsModule } from './models/topics/topics.module';
import { ProblemTopicsModule } from './models/problems_topics/problems_topics.module';
import { DifficultiesModule } from './models/difficulties/difficulties.module';
import { ProblemCompaniesModule } from './models/problems_companies/pb_com.module';
import { CompaniesModule } from './models/companies/companies.module';
import { AdminProblemModule } from './admin/problem/problem.module';

// Import các module liên quan đến đơn hàng và khuyến mãi
import { OrdersModule } from './models/orders/orders.module';
import { CouponsModule } from './models/coupons/coupons.module';
import { EnrollmentModule } from './models/enrollments/enrollments.module';

// Import các module liên quan đến AI API (Gemini, GPT, Claude)
import { GeminiApiModule } from './models/gemini-api/gemini-api.module';
import { GptApiModule } from './models/gpt-api/gpt-api.module';
import { ClaudeApiModule } from './models/claude-api/claude-api.module';

// Import Cloudinary và quản lý hình ảnh
import { CloudinaryModule } from './models/cloudinary/cloudinary.module';

// Import các entity
import { User } from './models/users/entities/user.entity';
import { Courses } from './models/courses/entities/courses.entity';
import { Problems } from './models/problems/entitites/problems.entity';
import { Process } from './models/process/entities/process.entity';
import { Enrollment } from './models/enrollments/entities/enrollments.entity';
import { Orders } from './models/orders/entities/orders.entites';
import { Coupons } from './models/coupons/entities/coupons.entites';
import { Topics } from './models/topics/entities/topics.entities';
import { ProblemTopics } from './models/problems_topics/entities/problems_topics.entities';
import { AcceptanceSubmission } from './models/acceptance_submissions/entities/acceptance_submissions.entity';
import { Submission } from './models/submission/entities/submission.model';
import { CourseIntroductions } from './models/course_introductions/entities/course_introduction.entity';
import { IntroductionDetails } from './models/introduction_details/entities/introduction_detail.entity';
import { Difficulty } from './models/difficulties/entities/difficulties.entites';
import { ProblemCompanies } from './models/problems_companies/entities/problems_companies.entits';
import { Companies } from './models/companies/entities/companies.entities';
import { Types } from './models/type/entities/types.entity';
import { CourseTypes } from './models/typeCourse/course_types.entity';
import { ProgressModule } from './models/user_lesson_progress/progress.module';
import { LessonsModule } from './models/course_lesson/course_lesson.module';
import { UserLessonProgress } from './models/user_lesson_progress/entities/progress.entity';
import { Lessons } from './models/course_lesson/entities/course_lesson.entity';
import { ChapterModule } from './models/course_chapter/chapter.module';
import { Chapter } from './models/course_chapter/entities/chapter.entity';
import { Discussions } from './models/discussion/entities/discussion.entity';
import { DiscussModule } from './models/discussion/discussion.module';
import { Tag } from './models/tags/entities/tags.entity';
import { TagModule } from './models/tags/tags.module';
import { TagDiscussion } from './models/tag_discussion/entities/tag_discussion.entity';
import { TagDiscussionModule } from './models/tag_discussion/tag_discussion.module';
import { Comments } from './models/comments/entities/comments.entity';
import { CommentModule } from './models/comments/comments.module';
import { UserComments } from './models/comments_user/entities/commets_user.entity';
import { UserCommentsModule } from './models/comments_user/comments_user.module';
import { DiscussionComment } from './models/comments_discussion/entities/comments_discussion.entity';
import { DiscussionCommentModule } from './models/comments_discussion/comments_discussion.module';
import { UserDiscussion } from './models/user_discussion/entities/user_discussion.entity';
import { UserDiscussionModule } from './models/user_discussion/user_discussion.module';
import { Category } from './models/categories/entities/categories.entity';
import { CategoryModule } from './models/categories/categories.module';
import { CategoryDiscussion } from './models/categories_discussion/entities/categories_discussion';
import { CategoryDiscussionModule } from './models/categories_discussion/categories_discussion.module';
import { PayOSModule } from './models/payos/payos.module';
import { AdminChapterModule } from './admin/chapters/chapters.module';
import { LessonsService } from './models/course_lesson/course_lesson.service';
import { AdminLessonsModule } from './admin/lesson/course_lesson.module';
import { languageCode } from './models/language_code/entities/language_code.entity';
import { LanguageCodeModule } from './models/language_code/language.module';
import { TestCase } from './models/testcase/entities/testcase.entity';
import { TestCaseModule } from './models/testcase/testcase.module';
import { AdminTopicsModule } from './admin/topics/topics.module';
import { AdminCompaniesModule } from './admin/companies/companies.module';
import { UserChapterProgress } from './models/user_chapter_progress/entities/user_chapter_progress.entity';
import { UserCourseProgress } from './models/user_course_progress/entities/user_course_progress.entity';
import { UserChapterProgressModule } from './models/user_chapter_progress/user_chapter_progress.module';
import { UserCourseProgressModule } from './models/user_course_progress/user_course_progress.module';

@Module({
  imports: [
    // Global Config và Multer (upload file)
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './images/' }),

    // Cấu hình Sequelize (cơ sở dữ liệu)
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
          Discussions,
          Tag,
          TagDiscussion,
          Comments,
          languageCode,
          TestCase,
          UserComments,
          DiscussionComment,
          UserDiscussion,
          Category,
          CategoryDiscussion,
          Enrollment,
          Orders,
          Coupons,
          Topics,
          ProblemTopics,
          AcceptanceSubmission,
          Submission,
          CourseIntroductions,
          IntroductionDetails,
          Difficulty,
          ProblemCompanies,
          Companies,
          Types,
          CourseTypes,
          UserLessonProgress,
          UserChapterProgress,
          UserCourseProgress,
          Lessons,
          Chapter,
        ],
        autoLoadModels: true,
        synchronize: true,
        // alter: true,
      }),
      inject: [ConfigService],
    }),

    // Mailer configuration (sử dụng Handlebars cho template email)
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
          from: `"COD-MASTER" <${configService.get<string>('MAIL_USER')}>`,
        },
        template: {
          dir: process.cwd() + '/src/mail/template/',
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
      inject: [ConfigService],
    }),

    // Các module hệ thống
    ScheduleModule.forRoot(),

    // Các module chính
    UsersModule,
    AuthModule,
    TopicsModule,
    LanguageCodeModule,
    TestCaseModule,
    ProblemTopicsModule,
    CoursesModule,
    DiscussModule,
    TagModule,
    TagDiscussionModule,
    CommentModule,
    UserCommentsModule,
    UserDiscussionModule,
    CategoryModule,
    CategoryDiscussionModule,
    DiscussionCommentModule,
    ProblemsModule,
    AcceptanceSubmissionsModule,
    ProcessModule,
    CouponsModule,
    EnrollmentModule,
    CloudinaryModule,
    OrdersModule,
    DifficultiesModule,
    ProblemCompaniesModule,
    CompaniesModule,
    SubmissionModule,
    UserChapterProgressModule,
    UserCourseProgressModule,
    ProgressModule,
    LessonsModule,
    ChapterModule,
    PayOSModule,

    // Các module quản trị
    AdminCoursesModule,
    AdminCourseIntroductionsModule,
    AdminIntroductionDetailsModule,
    AdminUserModule,
    AdminProblemModule,
    AdminChapterModule,
    AdminLessonsModule,
    AdminTopicsModule,
    AdminCompaniesModule,

    // Các module AI API
    GeminiApiModule,
    GptApiModule,
    ClaudeApiModule,

    // Các module giới thiệu và khóa học
    CourseIntroductionsModule,
    IntroductionDetailsModule,
    SolutionModule,
    SolutionCommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
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

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./models/users/users.module");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./models/users/entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auth/passport/jwt-auth.guard");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mailer_1 = require("@nestjs-modules/mailer");
const transform_interceptor_1 = require("./core/transform.interceptor");
const courses_entity_1 = require("./models/courses/entities/courses.entity");
const exercises_entity_1 = require("./models/exercises/entitites/exercises.entity");
const process_entity_1 = require("./models/process/entities/process.entity");
const enrollments_entity_1 = require("./models/enrollments/entities/enrollments.entity");
const courses_module_1 = require("./models/courses/courses.module");
const exercises_module_1 = require("./models/exercises/exercises.module");
const process_module_1 = require("./models/process/process.module");
const enrollments_module_1 = require("./models/enrollments/enrollments.module");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_module_1 = require("./models/cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({ dest: './images/' }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    dialect: configService.get('DB_DIALECT'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    models: [user_entity_1.User, courses_entity_1.Courses, exercises_entity_1.Exercises, process_entity_1.Process, enrollments_entity_1.Enrollment],
                    autoLoadModels: true,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: '"No Reply" <' + configService.get('MAIL_USER') + '>',
                    },
                    template: {
                        dir: process.cwd() + '/src/mail/template/',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            exercises_module_1.ExercisesModule,
            process_module_1.ProcessModule,
            enrollments_module_1.EnrollmentModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
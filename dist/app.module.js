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
const courses_entity_1 = require("./models/courses/entities/courses.entity");
const exercises_entity_1 = require("./models/exercises/entitites/exercises.entity");
const process_entity_1 = require("./models/process/entities/process.entity");
const enrollments_entity_1 = require("./models/enrollments/entities/enrollments.entity");
const courses_module_1 = require("./models/courses/courses.module");
const exercises_module_1 = require("./models/exercises/exercises.module");
const process_module_1 = require("./models/process/process.module");
const enrollments_module_1 = require("./models/enrollments/enrollments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            exercises_module_1.ExercisesModule,
            process_module_1.ProcessModule,
            enrollments_module_1.EnrollmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
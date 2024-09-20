"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const courses_entity_1 = require("./entities/courses.entity");
let CoursesService = class CoursesService {
    constructor(coursesModel) {
        this.coursesModel = coursesModel;
    }
    async create(createCoursesDto) {
        return this.coursesModel.create(createCoursesDto);
    }
    async findAll() {
        return this.coursesModel.findAll();
    }
    async findOne(id) {
        const course = await this.coursesModel.findByPk(id);
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.findOne(id);
        await course.update(updateCourseDto);
        return course;
    }
    async remove(id) {
        const course = await this.findOne(id);
        await course.destroy();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(courses_entity_1.Courses)),
    __metadata("design:paramtypes", [Object])
], CoursesService);
//# sourceMappingURL=courses.service.js.map
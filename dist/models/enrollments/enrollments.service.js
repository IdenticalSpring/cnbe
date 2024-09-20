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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const enrollments_entity_1 = require("./entities/enrollments.entity");
let EnrollmentsService = class EnrollmentsService {
    constructor(enrollmentModel) {
        this.enrollmentModel = enrollmentModel;
    }
    async create(createEnrollmentDto) {
        return this.enrollmentModel.create(createEnrollmentDto);
    }
    async findAll() {
        return this.enrollmentModel.findAll();
    }
    async findOne(id) {
        const enrollment = await this.enrollmentModel.findByPk(id);
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment with ID ${id} not found`);
        }
        return enrollment;
    }
    async update(id, updateEnrollmentDto) {
        const enrollment = await this.findOne(id);
        await enrollment.update(updateEnrollmentDto);
        return enrollment;
    }
    async remove(id) {
        const enrollment = await this.findOne(id);
        await enrollment.destroy();
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(enrollments_entity_1.Enrollment)),
    __metadata("design:paramtypes", [Object])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map
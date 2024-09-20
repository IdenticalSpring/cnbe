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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enrollments_service_1 = require("./enrollments.service");
const update_enrollments_1 = require("./dto/update-enrollments");
const create_enrollments_1 = require("./dto/create-enrollments");
let EnrollmentsController = class EnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    findAll() {
        return this.enrollmentsService.findAll();
    }
    create(createEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto);
    }
    findOne(id) {
        return this.enrollmentsService.findOne(+id);
    }
    update(id, updateEnrollmentDto) {
        return this.enrollmentsService.update(+id, updateEnrollmentDto);
    }
    remove(id) {
        return this.enrollmentsService.remove(+id);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrollments' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved enrollments.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new enrollment' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The enrollment has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollments_1.CreateEnrollmentsDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing enrollment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated enrollment.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enrollments_1.UpdateEnrollmentsDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "remove", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, swagger_1.ApiTags)('enrollments'),
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map
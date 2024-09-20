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
exports.ProcessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const process_service_1 = require("./process.service");
const create_process_dto_1 = require("./dto/create-process.dto");
const update_process_dto_1 = require("./dto/update-process.dto");
let ProcessController = class ProcessController {
    constructor(processService) {
        this.processService = processService;
    }
    findAll() {
        return this.processService.findAll();
    }
    create(createProcessDto) {
        return this.processService.create(createProcessDto);
    }
    findOne(id) {
        return this.processService.findOne(+id);
    }
    update(id, updateProcessDto) {
        return this.processService.update(+id, updateProcessDto);
    }
    remove(id) {
        return this.processService.remove(+id);
    }
};
exports.ProcessController = ProcessController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all process records' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved process records.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new process record' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The process record has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_process_dto_1.CreateProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing process record' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully updated process record.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_process_dto_1.UpdateProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "remove", null);
exports.ProcessController = ProcessController = __decorate([
    (0, swagger_1.ApiTags)('process'),
    (0, common_1.Controller)('process'),
    __metadata("design:paramtypes", [process_service_1.ProcessService])
], ProcessController);
//# sourceMappingURL=process.controller.js.map
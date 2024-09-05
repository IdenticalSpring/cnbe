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
exports.ProcessService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const process_entity_1 = require("./entities/process.entity");
let ProcessService = class ProcessService {
    constructor(processModel) {
        this.processModel = processModel;
    }
    async create(createProcessDto) {
        return this.processModel.create(createProcessDto);
    }
    async findAll() {
        return this.processModel.findAll();
    }
    async findOne(id) {
        const process = await this.processModel.findByPk(id);
        if (!process) {
            throw new common_1.NotFoundException(`Process with ID ${id} not found`);
        }
        return process;
    }
    async update(id, updateProcessDto) {
        const process = await this.findOne(id);
        await process.update(updateProcessDto);
        return process;
    }
    async remove(id) {
        const process = await this.findOne(id);
        await process.destroy();
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(process_entity_1.Process)),
    __metadata("design:paramtypes", [Object])
], ProcessService);
//# sourceMappingURL=process.service.js.map
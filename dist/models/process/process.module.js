"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const process_entity_1 = require("./entities/process.entity");
const process_controller_1 = require("./process.controller");
const process_service_1 = require("./process.service");
let ProcessModule = class ProcessModule {
};
exports.ProcessModule = ProcessModule;
exports.ProcessModule = ProcessModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([process_entity_1.Process])],
        controllers: [process_controller_1.ProcessController],
        providers: [process_service_1.ProcessService],
    })
], ProcessModule);
//# sourceMappingURL=process.module.js.map
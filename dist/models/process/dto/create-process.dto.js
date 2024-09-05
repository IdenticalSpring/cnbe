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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcessDto = void 0;
const class_validator_1 = require("@nestjs/class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProcessDto {
    constructor() {
        this.status = 'pending';
    }
}
exports.CreateProcessDto = CreateProcessDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The id of the user' }),
    __metadata("design:type", Number)
], CreateProcessDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The exerciseId of the user' }),
    __metadata("design:type", Number)
], CreateProcessDto.prototype, "exerciseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The status of the exercise',
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    }),
    (0, class_validator_1.IsEnum)(['pending', 'in-progress', 'completed'], {
        message: 'Status must be either pending, in-progress, or completed',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProcessDto.prototype, "status", void 0);
//# sourceMappingURL=create-process.dto.js.map
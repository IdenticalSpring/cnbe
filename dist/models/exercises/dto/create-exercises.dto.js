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
exports.CreateExercisesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExercisesDto {
}
exports.CreateExercisesDto = CreateExercisesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The title of the course' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title cannot be empty' }),
    __metadata("design:type", String)
], CreateExercisesDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The description of the course' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty' }),
    __metadata("design:type", String)
], CreateExercisesDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The difficulty of the course' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Difficulty cannot be empty' }),
    __metadata("design:type", String)
], CreateExercisesDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The courseId of the course' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CourseId cannot be empty' }),
    __metadata("design:type", Number)
], CreateExercisesDto.prototype, "courseId", void 0);
//# sourceMappingURL=create-exercises.dto.js.map
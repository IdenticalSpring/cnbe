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
exports.ChangePasswordAuthDto = exports.RetryActiveDto = exports.codeAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class codeAuthDto {
}
exports.codeAuthDto = codeAuthDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Id cannot be empty" }),
    (0, swagger_1.ApiProperty)({ description: 'Id of the user' }),
    __metadata("design:type", String)
], codeAuthDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Code cannot be empty" }),
    (0, swagger_1.ApiProperty)({ description: 'The code of the user' }),
    __metadata("design:type", String)
], codeAuthDto.prototype, "codeId", void 0);
class RetryActiveDto {
}
exports.RetryActiveDto = RetryActiveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The email of the user for retrying activation' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email cannot be empty' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], RetryActiveDto.prototype, "email", void 0);
class ChangePasswordAuthDto {
}
exports.ChangePasswordAuthDto = ChangePasswordAuthDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Password cannot be empty" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Code cannot be empty" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordAuthDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "ConfirmPassword cannot be empty" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordAuthDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Email cannot be empty" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordAuthDto.prototype, "email", void 0);
//# sourceMappingURL=code-auth.dto.js.map
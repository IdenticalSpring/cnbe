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
exports.Enrollment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const courses_entity_1 = require("../../courses/entities/courses.entity");
let Enrollment = class Enrollment extends sequelize_typescript_1.Model {
};
exports.Enrollment = Enrollment;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Enrollment.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Enrollment.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => courses_entity_1.Courses),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Enrollment.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => courses_entity_1.Courses),
    __metadata("design:type", courses_entity_1.Courses)
], Enrollment.prototype, "course", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'createdAt',
    }),
    __metadata("design:type", Date)
], Enrollment.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updatedAt',
    }),
    __metadata("design:type", Date)
], Enrollment.prototype, "updatedAt", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'enrollments',
        timestamps: true,
    })
], Enrollment);
//# sourceMappingURL=enrollments.entity.js.map
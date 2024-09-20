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
exports.Process = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
const exercises_entity_1 = require("../../exercises/entitites/exercises.entity");
let Process = class Process extends sequelize_typescript_1.Model {
    static updateCompleteAt(instance) {
        if (instance.status === 'completed') {
            instance.completeAt = new Date();
        }
    }
};
exports.Process = Process;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Process.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Process.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Process.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => exercises_entity_1.Exercises),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Process.prototype, "exerciseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => exercises_entity_1.Exercises),
    __metadata("design:type", exercises_entity_1.Exercises)
], Process.prototype, "exercise", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
    }),
    __metadata("design:type", String)
], Process.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'completeAt',
    }),
    __metadata("design:type", Date)
], Process.prototype, "completeAt", void 0);
__decorate([
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Process]),
    __metadata("design:returntype", void 0)
], Process, "updateCompleteAt", null);
exports.Process = Process = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'process',
        timestamps: false,
    })
], Process);
//# sourceMappingURL=process.entity.js.map
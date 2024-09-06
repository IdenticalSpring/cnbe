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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../models/users/users.service");
const utils_1 = require("../helper/utils");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.handleRegister = async (registerDto) => {
            return await this.usersService.handleRegister(registerDto);
        };
        this.checkCode = async (data) => {
            return await this.usersService.handleActive(data);
        };
        this.retryActive = async (data) => {
            return await this.usersService.retryActive(data);
        };
        this.retryPassword = async (data) => {
            return await this.usersService.retryPassword(data);
        };
        this.changePassword = async (data) => {
            return await this.usersService.changePassword(data);
        };
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            return null;
        }
        const isValidPassword = await (0, utils_1.comparePasswordHelper)(pass, user.password);
        if (!isValidPassword) {
            return null;
        }
        return user;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async logout(token) {
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
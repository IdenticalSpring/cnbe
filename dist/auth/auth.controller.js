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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const swagger_1 = require("@nestjs/swagger");
const local_auth_guard_1 = require("./passport/local-auth.guard");
const jwt_auth_guard_1 = require("./passport/jwt-auth.guard");
const public_decorator_1 = require("../decorator/public.decorator");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const mailer_1 = require("@nestjs-modules/mailer");
const code_auth_dto_1 = require("./dto/code-auth.dto");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, mailerService) {
        this.authService = authService;
        this.mailerService = mailerService;
    }
    async login(req, res) {
        const { access_token } = await this.authService.login(req.user);
        res.cookie('jwt', access_token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        return { message: 'Logged in successfully' };
    }
    async logout(req, res) {
        const token = req.cookies['jwt'];
        const result = await this.authService.logout(token);
        res.clearCookie('jwt');
        return result;
    }
    getProfile(req) {
        return req.user;
    }
    register(registerDto) {
        return this.authService.handleRegister(registerDto);
    }
    async checkCode(codeDto) {
        return await this.authService.checkCode(codeDto);
    }
    retryActive(retryActiveDto) {
        return this.authService.retryActive(retryActiveDto.email);
    }
    retryPassword(email) {
        return this.authService.retryPassword(email);
    }
    changePassword(data) {
        return this.authService.changePassword(data);
    }
    async githubLogin() { }
    async githubLoginCallback(req, res) {
        const user = req.user;
        const { access_token } = await this.authService.login(user);
        res.cookie('jwt', access_token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        return { message: 'Logged in successfully', access_token };
    }
    async googleAuth(req) {
    }
    async googleAuthRedirect(req, res) {
        const { access_token } = req.user;
        res.cookie('jwt', access_token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
        return { message: 'Logged in successfully with Google' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'User Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful.' }),
    (0, swagger_1.ApiBody)({ type: login_auth_dto_1.LoginAuthDto }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, public_decorator_1.ResponseMassage)('User logged in successfully'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('logout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin Profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lấy profile thành công.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'User Registration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Registration successful.' }),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('check-code'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [code_auth_dto_1.codeAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)('retry-active'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [code_auth_dto_1.RetryActiveDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "retryActive", null);
__decorate([
    (0, common_1.Post)('retry-password'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'user@example.com',
                    description: 'The email address of the account to reset the password',
                },
            },
            required: ['email'],
        },
    }),
    __param(0, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "retryPassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [code_auth_dto_1.ChangePasswordAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('github'),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubLogin", null);
__decorate([
    (0, common_1.Get)('github/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "githubLoginCallback", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Google OAuth Callback' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Handles Google OAuth callback and logs user in.' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mailer_1.MailerService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
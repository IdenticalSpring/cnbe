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
let AuthController = class AuthController {
    constructor(authService, mailerService) {
        this.authService = authService;
        this.mailerService = mailerService;
    }
    handleLogin(req, loginDto) {
        return this.authService.login(req.user);
    }
    getProfile(req) {
        return req.user;
    }
    register(registerDto) {
        return this.authService.handleRegister(registerDto);
    }
    async testMail() {
        try {
            await this.mailerService.sendMail({
                to: 'qpham7286@gmail.com',
                subject: 'Testing Nest MailerModule ✔',
                template: 'register',
                context: {
                    name: "Eric",
                    activationCode: 123456789
                }
            });
            return { message: "Email sent successfully" };
        }
        catch (error) {
            console.error('Failed to send email:', error);
            throw new common_1.HttpException('Failed to send email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully login.' }),
    (0, swagger_1.ApiBody)({ type: login_auth_dto_1.LoginAuthDto }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, public_decorator_1.ResponseMassage)('Fetch Login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_auth_dto_1.LoginAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully profile.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully register.' }),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('mail'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Test email sending' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to send email.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testMail", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mailer_1.MailerService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
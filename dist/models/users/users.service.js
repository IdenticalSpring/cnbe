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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entities/user.entity");
const utils_1 = require("../../helper/utils");
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
const mailer_1 = require("@nestjs-modules/mailer");
let UsersService = class UsersService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    async create(createUserDto) {
        try {
            const hashedPassword = await (0, utils_1.hashPasswordHelper)(createUserDto.password);
            const userWithHashedPassword = {
                ...createUserDto,
                password: hashedPassword,
            };
            return await this.userModel.create(userWithHashedPassword);
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
    async findAll() {
        return this.userModel.findAll();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async findByUsername(username) {
        return await this.userModel.findOne({ where: { username } });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async handleRegister(registerDto) {
        const { name, username, password, email } = registerDto;
        const isExist = await this.isUsernameExist(username);
        if (isExist === true) {
            throw new common_1.BadRequestException(`Username already exists: ${username}. Please use a different username.`);
        }
        const hashPassword = await (0, utils_1.hashPasswordHelper)(password);
        const codeId = (0, uuid_1.v4)();
        const user = await this.userModel.create({
            name,
            username,
            email,
            password: hashPassword,
            isActive: false,
            codeId: codeId,
            codeExpired: (0, dayjs_1.default)().add(5, 'minutes').toDate(),
        });
        await this.sendActivationEmail(user, name ?? username, codeId);
        return { success: true, message: "User registered successfully", id: user.id };
    }
    async sendActivationEmail(user, name, activationCode) {
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: `Activate your account`,
                template: 'template',
                context: {
                    name,
                    activationCode,
                },
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send activation email');
        }
    }
    async isUsernameExist(username) {
        const user = await this.userModel.findOne({ where: { username } });
        return !!user;
    }
    async handleActive(data) {
        const user = await this.userModel.findOne({
            where: {
                id: data.id,
                codeId: data.codeId,
                isActive: false,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException("Invalid activation code or the code has expired.");
        }
        const isBeforeCheck = (0, dayjs_1.default)().isBefore(user.codeExpired);
        if (isBeforeCheck) {
            await this.userModel.update({ isActive: true, codeId: null, codeExpired: null }, { where: { id: data.id } });
        }
        else {
            throw new common_1.BadRequestException("Invalid activation code or the code has expired.");
        }
        return { success: true, message: "Account activated successfully" };
    }
    async retryActive(email) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException("Account does not exist");
        }
        if (user.isActive) {
            throw new common_1.BadRequestException("Account is already activated");
        }
        const newCodeId = (0, uuid_1.v4)();
        const newCodeExpiration = (0, dayjs_1.default)().add(5, "minutes").toDate();
        await user.update({
            codeId: newCodeId,
            codeExpired: newCodeExpiration,
        });
        await this.sendActivationEmail(user, user.name ?? user.email, newCodeId);
        return { success: true, message: "New activation code sent successfully", id: user.id };
    }
    async retryPassword(email) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException("Account does not exist");
        }
        const codeId = (0, uuid_1.v4)();
        const codeExpired = (0, dayjs_1.default)().add(5, "minutes").toDate();
        await user.update({
            codeId: codeId,
            codeExpired: codeExpired
        });
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Change password`,
            template: "password-reset",
            context: {
                name: user.name ?? user.email,
                activationCode: codeId
            }
        });
        return { success: true, message: "Password reset code sent successfully", id: user.id, email: user.email };
    }
    async changePassword(data) {
        if (data.confirmPassword !== data.password) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        const user = await this.userModel.findOne({
            where: {
                email: data.email,
                codeId: data.code,
                isActive: true
            }
        });
        if (!user) {
            throw new common_1.BadRequestException("Account does not exist or the code is invalid");
        }
        const isBeforeExpiration = (0, dayjs_1.default)().isBefore(user.codeExpired);
        if (!isBeforeExpiration) {
            throw new common_1.BadRequestException("The code has expired");
        }
        const newPassword = await (0, utils_1.hashPasswordHelper)(data.password);
        await user.update({
            password: newPassword,
            codeId: null,
            codeExpired: null
        });
        return { success: true, message: "Password changed successfully" };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map
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
            codeExpired: (0, dayjs_1.default)().add(5, 'minutes').toDate()
        });
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: `Activate your account`,
                template: "template",
                context: {
                    name: name ?? username,
                    activationCode: codeId
                }
            });
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
        return {
            _id: user.id
        };
    }
    async isUsernameExist(username) {
        const user = await this.userModel.findOne({ where: { username } });
        return !!user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map
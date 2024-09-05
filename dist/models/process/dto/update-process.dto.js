"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcessDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_process_dto_1 = require("./create-process.dto");
class UpdateProcessDto extends (0, swagger_1.PartialType)(create_process_dto_1.CreateProcessDto) {
}
exports.UpdateProcessDto = UpdateProcessDto;
//# sourceMappingURL=update-process.dto.js.map
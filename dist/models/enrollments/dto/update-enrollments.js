"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrollmentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_enrollments_1 = require("./create-enrollments");
class UpdateEnrollmentsDto extends (0, swagger_1.PartialType)(create_enrollments_1.CreateEnrollmentsDto) {
}
exports.UpdateEnrollmentsDto = UpdateEnrollmentsDto;
//# sourceMappingURL=update-enrollments.js.map
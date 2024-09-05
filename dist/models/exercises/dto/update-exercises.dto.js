"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExercisesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_exercises_dto_1 = require("./create-exercises.dto");
class UpdateExercisesDto extends (0, swagger_1.PartialType)(create_exercises_dto_1.CreateExercisesDto) {
}
exports.UpdateExercisesDto = UpdateExercisesDto;
//# sourceMappingURL=update-exercises.dto.js.map
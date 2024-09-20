"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMassage = exports.RESPONSE_MESSAGE = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.RESPONSE_MESSAGE = 'response-message';
const ResponseMassage = (message) => (0, common_1.SetMetadata)(exports.RESPONSE_MESSAGE, message);
exports.ResponseMassage = ResponseMassage;
//# sourceMappingURL=public.decorator.js.map
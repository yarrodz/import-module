"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Validator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OAuth2Validator = joi_1.default.object({
    client_id: joi_1.default.string().required(),
    client_secret: joi_1.default.string().optional().allow(null),
    auth_uri: joi_1.default.string().required(),
    token_uri: joi_1.default.string().required(),
    scope: joi_1.default.string().optional().allow(null),
    use_code_verifier: joi_1.default.bool().required()
});
//# sourceMappingURL=oauth2.validator.js.map
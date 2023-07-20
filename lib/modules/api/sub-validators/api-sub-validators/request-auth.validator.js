"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAuthValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const request_auth_type_enum_1 = require("../../enums/request-auth-type.enum");
const api_key_validator_1 = require("../auth-sub-validators/api-key.validator");
const basic_digest_validator_1 = require("../auth-sub-validators/basic-digest.validator");
const bearer_validator_1 = require("../auth-sub-validators/bearer.validator");
const oauth2_validator_1 = require("../../../oauth2/oauth2.validator");
exports.RequestAuthValidator = joi_1.default.object({
    type: joi_1.default.string()
        .valid(...Object.values(request_auth_type_enum_1.RequestAuthType))
        .required(),
    apiKey: api_key_validator_1.ApiKeyValidator.optional().allow(null),
    basicDigest: basic_digest_validator_1.BasicDigestValidator.optional().allow(null),
    bearer: bearer_validator_1.BearerValidator.optional().allow(null),
    oauth2: oauth2_validator_1.OAuth2Validator.optional().allow(null)
});
//# sourceMappingURL=request-auth.validator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApiConnectionValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const api_connection_type_enum_1 = require("../enums/api-connection-type.enum");
const api_key_validator_1 = require("./connection-validators/api-key.validator");
const basic_digest_validator_1 = require("./connection-validators/basic-digest.validator");
const bearer_validator_1 = require("./connection-validators/bearer.validator");
const oauth2_validator_1 = require("../../oauth2/validators/oauth2.validator");
const source_enum_1 = require("../../imports/enums/source.enum");
const out_reference_validator_1 = require("../../imports/validators/out-reference.validator");
exports.CreateApiConnectionValidator = joi_1.default.object({
    name: joi_1.default.string().min(1).max(128).required(),
    source: joi_1.default.string().valid(source_enum_1.Source.API).required(),
    type: joi_1.default.string()
        .valid(...Object.values(api_connection_type_enum_1.ApiConnectionType))
        .required(),
    apiKey: api_key_validator_1.ApiKeyValidator.optional(),
    basicDigest: basic_digest_validator_1.BasicDigestValidator.optional(),
    bearer: bearer_validator_1.BearerValidator.optional(),
    oauth2: oauth2_validator_1.OAuth2Validator.optional(),
    __: joi_1.default.object({
        inUnit: out_reference_validator_1.OutReferenceValidator.required()
    }).required()
});
//# sourceMappingURL=create-api-connection.validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAuthSchema = void 0;
const mongoose_1 = require("mongoose");
const request_auth_type_enum_1 = require("../../enums/request-auth-type.enum");
const api_key_schema_1 = require("../auth-sub-schemas/api-key.schema");
const basic_digest_schema_1 = require("../auth-sub-schemas/basic-digest.schema");
const bearer_schema_1 = require("../auth-sub-schemas/bearer.schema");
const oauth2_schema_1 = require("../../../oauth2/oauth2.schema");
exports.RequestAuthSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(request_auth_type_enum_1.RequestAuthType),
        required: true
    },
    apiKey: { type: api_key_schema_1.ApiKeySchema, required: false },
    basicDigest: { type: basic_digest_schema_1.BasicDigestSchema, required: false },
    bearer: { type: bearer_schema_1.BearerSchema, required: false },
    oauth2: { type: oauth2_schema_1.OAuth2Schema, required: false }
}, {
    _id: false
});
//# sourceMappingURL=request-auth.shema.js.map
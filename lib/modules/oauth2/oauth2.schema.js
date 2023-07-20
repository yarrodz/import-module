"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Schema = void 0;
const mongoose_1 = require("mongoose");
exports.OAuth2Schema = new mongoose_1.Schema({
    client_id: { type: String, required: true },
    client_secret: { type: String, required: false },
    auth_uri: { type: String, required: true },
    token_uri: { type: String, required: true },
    scope: { type: String, required: false },
    use_code_verifier: { type: Boolean, required: true },
    access_token: { type: String, required: false },
    refresh_token: { type: String, required: false }
}, {
    _id: false
});
//# sourceMappingURL=oauth2.schema.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const GRANT_TYPE = 'refresh_token';
class OAuth2RefreshTokenHelper {
    constructor(importsRepository) {
        this.refresh = async (impt) => {
            const { _id: importId } = impt;
            try {
                const { oauth2 } = impt.api.auth;
                const { client_id, client_secret, token_uri, refresh_token, scope } = oauth2;
                const body = {
                    grant_type: GRANT_TYPE,
                    client_id,
                    refresh_token
                };
                if (client_secret) {
                    body.client_secret = client_secret;
                }
                if (scope) {
                    body.scope = scope;
                }
                const config = {
                    method: 'POST',
                    url: token_uri,
                    data: body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const response = await (0, axios_1.default)(config);
                const { access_token } = response.data;
                await this.importsRepository.update(importId, {
                    'api.auth.oauth2.access_token': access_token
                });
            }
            catch (error) {
                await this.importsRepository.update(importId, {
                    'api.auth.oauth2.access_token': null,
                    'api.auth.oauth2.refresh_token': null
                });
                throw new Error(`Error while refreshing oauth2 access token. Access and refresh tokens were removed: ${error.message}`);
            }
        };
        this.importsRepository = importsRepository;
    }
}
exports.default = OAuth2RefreshTokenHelper;
//# sourceMappingURL=oath2-refresh-token.helper.js.map
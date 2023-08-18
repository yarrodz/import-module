"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_key_placement_enum_1 = require("../enums/api-key-placement.enum");
const api_connection_type_enum_1 = require("../enums/api-connection-type.enum");
class AuthRequestHelper {
    static async auth(request, auth) {
        if (auth === undefined) {
            return;
        }
        const { type } = auth;
        switch (type) {
            case api_connection_type_enum_1.ApiConnectionType.API_KEY: {
                this.apiKeyAuth(request, auth);
                break;
            }
            case api_connection_type_enum_1.ApiConnectionType.BASIC: {
                this.basicAuth(request, auth);
                break;
            }
            case api_connection_type_enum_1.ApiConnectionType.BEARER_TOKEN: {
                this.bearerAuth(request, auth);
                break;
            }
            case api_connection_type_enum_1.ApiConnectionType.OAUTH2: {
                this.oauth2(request, auth);
                break;
            }
            default: {
                throw new Error(`Error while authorizing request. Unknown auth type: ${type}.`);
            }
        }
    }
    static apiKeyAuth(request, auth) {
        const { key, value, placement } = auth.apiKey;
        switch (placement) {
            case api_key_placement_enum_1.ApiKeyPlacement.HEADERS: {
                request.headers = request.headers || {};
                request.headers[key] = `${value}`;
                break;
            }
            case api_key_placement_enum_1.ApiKeyPlacement.QUERY_PARAMETERS: {
                request.params = request.params || {};
                request.params[key] = value;
                break;
            }
            default:
                throw new Error('Error while setting API key in request. Unknown placement.');
        }
    }
    static basicAuth(request, auth) {
        const { basicDigest } = auth;
        request.auth = basicDigest;
    }
    static bearerAuth(request, auth) {
        const { token } = auth.bearer;
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${token}`;
    }
    static async oauth2(request, auth) {
        const { access_token } = auth.oauth2;
        if (access_token) {
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${access_token}`;
        }
        else {
            throw new Error('Error while OAuth2. Access token was not set in request.');
        }
    }
}
exports.default = AuthRequestHelper;
//# sourceMappingURL=auth-request.helper.js.map
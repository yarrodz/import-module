"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_auth_type_enum_1 = require("../enums/request-auth-type.enum");
const api_key_placement_enum_1 = require("../enums/api-key-placement.enum");
class AuthRequestHelper {
    async auth(request, auth) {
        if (!auth) {
            return;
        }
        const { type } = auth;
        switch (type) {
            case request_auth_type_enum_1.RequestAuthType.API_KEY: {
                this.apiKeyAuth(request, auth);
                break;
            }
            case request_auth_type_enum_1.RequestAuthType.BASIC: {
                this.basicAuth(request, auth);
                break;
            }
            case request_auth_type_enum_1.RequestAuthType.BEARER_TOKEN: {
                this.bearerAuth(request, auth);
                break;
            }
            case request_auth_type_enum_1.RequestAuthType.OAUTH2: {
                this.oauth2(request, auth);
                break;
            }
            default: {
                throw new Error(`Error while authorizing request. Unknown auth type: ${type}.`);
            }
        }
    }
    apiKeyAuth(request, auth) {
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
    basicAuth(request, auth) {
        const { basicDigest } = auth;
        request.auth = basicDigest;
    }
    bearerAuth(request, auth) {
        const { token } = auth.bearer;
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${token}`;
    }
    async oauth2(request, auth) {
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
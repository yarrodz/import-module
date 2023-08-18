"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const oauth2_session_helper_1 = __importDefault(require("./oauth2-session.helper"));
const PROMPT = 'consent';
const ACCESS_TYPE = 'offline';
const RESPONSE_TYPE = 'code';
const CODE_CHALANGE_METHOD = 'S256';
class OAuth2AuthUriHelper {
    constructor(oAuth2RedirectUri) {
        this.createUri = async (req, connection, context) => {
            const oAuth2SessionHelper = new oauth2_session_helper_1.default(req.session);
            const { oauth2 } = connection;
            const { auth_uri, use_code_verifier } = oauth2;
            const state = crypto_1.default.randomBytes(100).toString('base64url');
            const authUriParams = this.createAuthUriParams(oauth2, state);
            const callbackParams = this.createAuthCallbackParams(oauth2);
            if (use_code_verifier) {
                this.setCodeVerifier(authUriParams, callbackParams);
            }
            const oAuth2CallbackProcess = {
                state,
                context,
                params: callbackParams
            };
            oAuth2SessionHelper.addCallbackProcess(oAuth2CallbackProcess);
            const authUriQueryString = this.queryStringFromObject(authUriParams);
            const authUri = `${auth_uri}?${authUriQueryString}`;
            return authUri;
        };
        this.oAuth2RedirectUri = oAuth2RedirectUri;
    }
    createAuthUriParams(oAuth2, state) {
        const { client_id, scope } = oAuth2;
        const authUriParams = {
            client_id,
            state,
            prompt: PROMPT,
            access_type: ACCESS_TYPE,
            response_type: RESPONSE_TYPE,
            redirect_uri: this.oAuth2RedirectUri
        };
        if (scope) {
            authUriParams.scope = scope;
        }
        return authUriParams;
    }
    createAuthCallbackParams(oAuth2) {
        const { client_id, client_secret, token_uri } = oAuth2;
        const callbackParams = {
            client_id,
            token_uri
        };
        if (client_secret) {
            callbackParams.client_secret = client_secret;
        }
        return callbackParams;
    }
    setCodeVerifier(authUriParams, callbackParams) {
        const code_verifier = crypto_1.default.randomBytes(96).toString('base64url');
        const code_challenge = crypto_1.default
            .createHash('sha256')
            .update(code_verifier)
            .digest('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        authUriParams.code_challenge_method = CODE_CHALANGE_METHOD;
        authUriParams.code_challenge = code_challenge;
        authUriParams.code_verifier = code_verifier;
        callbackParams.code_verifier = code_verifier;
    }
    queryStringFromObject(object) {
        return Object.keys(object)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
            .join('&');
    }
}
exports.default = OAuth2AuthUriHelper;
//# sourceMappingURL=oauth2-auth-uri.helper.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const oauth2_session_helper_1 = __importDefault(require("./oauth2-session.helper"));
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const import_context_action_enum_1 = require("../imports/enums/import-context-action.enum");
const GRANT_TYPE = 'authorization_code';
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth-callback/';
class OAuth2Service {
    constructor(importsRepository, oAuth2RedirectUri, clientUri) {
        this.oAuth2Callback = async (req) => {
            const responseHandler = new response_handler_1.default();
            let callbackProcess;
            try {
                const { session, query } = req;
                const { code, state } = query;
                const oAuth2SessionHelper = new oauth2_session_helper_1.default(session);
                callbackProcess = oAuth2SessionHelper.findCallbackProcess(state);
                oAuth2SessionHelper.removeCallbackProcess(state);
                const { params, context } = callbackProcess;
                const { token_uri, client_id, client_secret } = params;
                const { importId } = context;
                const body = this.createCallbackBody(code, params);
                const config = {
                    method: 'POST',
                    url: token_uri,
                    data: body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                if (client_secret) {
                    config.auth = {
                        username: client_id,
                        password: client_secret
                    };
                }
                const response = await (0, axios_1.default)(config);
                const { access_token, refresh_token } = response.data;
                await this.importsRepository.update(importId, {
                    'api.auth.oauth2.access_token': access_token,
                    'api.auth.oauth2.refresh_token': refresh_token
                });
                const successRedirectUri = this.createSuccessRedirectUri(callbackProcess);
                responseHandler.setRedirect(successRedirectUri);
                return responseHandler;
            }
            catch (error) {
                const errorRedirectUri = this.createErrorRedirectUri(callbackProcess);
                responseHandler.setRedirect(errorRedirectUri);
                return responseHandler;
            }
        };
        this.importsRepository = importsRepository;
        this.oAuth2RedirectUri = oAuth2RedirectUri;
        this.clientUri = clientUri;
    }
    createCallbackBody(code, params) {
        const { client_id, client_secret, code_verifier } = params;
        const body = {
            code,
            client_id,
            grant_type: GRANT_TYPE,
            redirect_uri: this.oAuth2RedirectUri
        };
        if (client_secret) {
            body.client_secret = client_secret;
        }
        if (code_verifier) {
            body.code_verifier = code_verifier;
        }
        return body;
    }
    createSuccessRedirectUri(callbackProcess) {
        const { context } = callbackProcess;
        const { action, importId, processId } = context;
        switch (action) {
            case import_context_action_enum_1.ImportContextAction.CONNECT: {
                return `${this.clientUri}imports/connect/${importId}`;
            }
            case import_context_action_enum_1.ImportContextAction.START: {
                return `${this.clientUri}imports/start/${importId}`;
            }
            case import_context_action_enum_1.ImportContextAction.RELOAD: {
                return `${this.clientUri}processes/reload/${processId}`;
            }
            case import_context_action_enum_1.ImportContextAction.RETRY: {
                return `${this.clientUri}processes/retry/${processId}`;
            }
            default: {
                throw new Error('Unknown contex action inside OAuth2 callback');
            }
        }
    }
    createErrorRedirectUri(callbackProcess) {
        if (callbackProcess === undefined) {
            const errorMessage = 'Could not find callback context';
            return `${this.clientUri}imports/errorMessage=${errorMessage}`;
        }
        else {
            const { context } = callbackProcess;
            const { action } = context;
            const errorMessage = 'Error while OAuth2 callback';
            switch (action) {
                case import_context_action_enum_1.ImportContextAction.CONNECT:
                case import_context_action_enum_1.ImportContextAction.START: {
                    return `${this.clientUri}imports/errorMessage=${errorMessage}`;
                }
                case import_context_action_enum_1.ImportContextAction.RELOAD:
                case import_context_action_enum_1.ImportContextAction.RETRY: {
                    return `${this.clientUri}processes/errorMessage=${errorMessage}`;
                }
                default: {
                    throw new Error('Unknown contex action inside OAuth2 callback');
                }
            }
        }
    }
}
exports.default = OAuth2Service;
//# sourceMappingURL=oauth2.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const oauth2_session_helper_1 = __importDefault(require("./helpers/oauth2-session.helper"));
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const context_action_enum_1 = require("../imports/enums/context-action-enum");
const GRANT_TYPE = 'authorization_code';
class OAuth2Service {
    constructor(oAuth2RedirectUri, clientUri, connectionsRepository) {
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
                const { connectionId } = context;
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
                const connectionBefore = await this.connectionsRepository.load(connectionId);
                const { oauth2 } = connectionBefore;
                await this.connectionsRepository.update({
                    id: connectionId,
                    oauth2: {
                        ...oauth2,
                        access_token,
                        refresh_token
                    }
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
        this.oAuth2RedirectUri = oAuth2RedirectUri;
        this.clientUri = clientUri;
        this.connectionsRepository = connectionsRepository;
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
        const { action, importId, transferId } = context;
        switch (action) {
            case context_action_enum_1.ContextAction.GET_COLUMNS: {
                return `${this.clientUri}imports/get_columns/${importId}`;
            }
            case context_action_enum_1.ContextAction.IMPORT: {
                return `${this.clientUri}imports/import/${importId}`;
            }
            case context_action_enum_1.ContextAction.RELOAD: {
                return `${this.clientUri}transfers/reload/${transferId}`;
            }
            case context_action_enum_1.ContextAction.RETRY: {
                return `${this.clientUri}transfers/retry/${transferId}`;
            }
            default: {
                throw new Error('Unknown contex action inside OAuth2 callback');
            }
        }
    }
    createErrorRedirectUri(callbackProcess) {
        if (callbackProcess === undefined) {
            const errorMessage = 'Could not find callback context';
            return `${this.clientUri}imports/${errorMessage}`;
        }
        else {
            const { context } = callbackProcess;
            const { action } = context;
            const errorMessage = 'Error while OAuth2 callback';
            switch (action) {
                case context_action_enum_1.ContextAction.GET_COLUMNS:
                case context_action_enum_1.ContextAction.IMPORT: {
                    return `${this.clientUri}imports/${errorMessage}`;
                }
                case context_action_enum_1.ContextAction.RELOAD:
                case context_action_enum_1.ContextAction.RETRY: {
                    return `${this.clientUri}imports/${errorMessage}`;
                }
                default: {
                    const errorMessage = 'Unknown contex action inside OAuth2 callback';
                    return `${this.clientUri}imports/${errorMessage}`;
                }
            }
        }
    }
}
exports.default = OAuth2Service;
//# sourceMappingURL=oauth2.service.js.map
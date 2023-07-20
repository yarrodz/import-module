"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_connector_1 = __importDefault(require("./connector/api-connector"));
const transfer_type_enum_1 = require("../transfer/enums/transfer-type.enum");
const request_auth_type_enum_1 = require("./enums/request-auth-type.enum");
const connection_state_enum_1 = require("../connection/connection-state.enum");
class ApiConnectionHelper {
    constructor(importsRepository, oAuth2RefreshTokenHelper) {
        this.importsRepository = importsRepository;
        this.oAuth2RefreshTokenHelper = oAuth2RefreshTokenHelper;
    }
    async connect(impt) {
        try {
            const { api, _id: importId } = impt;
            let { transferType, auth } = api;
            if (auth?.type === request_auth_type_enum_1.RequestAuthType.OAUTH2) {
                const { oauth2 } = auth;
                if (!oauth2.access_token) {
                    return connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED;
                }
                else {
                    try {
                        await this.sendRequest(api, transferType);
                        return connection_state_enum_1.ConnectionState.CONNECTED;
                    }
                    catch (error) {
                        try {
                            await this.oAuth2RefreshTokenHelper.refresh(impt);
                        }
                        catch (error) {
                            return connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED;
                        }
                        const refreshedImport = await this.importsRepository.findById(importId);
                        const { api } = refreshedImport;
                        await this.sendRequest(api, transferType);
                    }
                }
            }
            else {
                await this.sendRequest(api, transferType);
            }
            return connection_state_enum_1.ConnectionState.CONNECTED;
        }
        catch (error) {
            throw new Error(`Error while connecting to API: ${error.message}`);
        }
    }
    async sendRequest(api, transferType) {
        const apiConnector = new api_connector_1.default(api);
        await apiConnector.authorizeRequest();
        switch (transferType) {
            case transfer_type_enum_1.TransferType.CHUNK: {
                await apiConnector.sendRequest();
                break;
            }
            case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                const pagination = {
                    offset: 0,
                    limit: 1
                };
                apiConnector.paginateRequest(pagination);
                await apiConnector.sendRequest();
                break;
            }
            case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                const pagination = {
                    limit: 1
                };
                apiConnector.paginateRequest(pagination);
                await apiConnector.sendRequest();
                break;
            }
            default: {
                throw new Error(`Unknown API transfer type: '${transferType}'.`);
            }
        }
    }
}
exports.default = ApiConnectionHelper;
//# sourceMappingURL=api-connection.helper.js.map
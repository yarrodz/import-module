"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_connector_1 = __importDefault(require("../connector/api-connector"));
const connection_state_enum_1 = require("../enums/connection-state.enum");
const api_connection_type_enum_1 = require("../enums/api-connection-type.enum");
const transfer_method_enum_1 = require("../../transfers/enums/transfer-method.enum");
class ApiConnectionHelper {
    constructor(oAuth2RefreshTokenHelper, processesRepository) {
        this.oAuth2RefreshTokenHelper = oAuth2RefreshTokenHelper;
        this.processesRepository = processesRepository;
    }
    async connect(impt) {
        try {
            const { id: importId } = impt;
            const connection = impt.__.hasConnection;
            if (connection.type === api_connection_type_enum_1.ApiConnectionType.OAUTH2) {
                const { oauth2 } = connection;
                if (oauth2.access_token === undefined) {
                    // If access token not exists - we have to receive it
                    return connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED;
                }
                else {
                    try {
                        // If exists - send request
                        await this.sendRequest(impt);
                        return connection_state_enum_1.ConnectionState.CONNECTED;
                    }
                    catch (error) {
                        if (oauth2.refresh_token === undefined) {
                            // If api oauth2 does not have refresh tokens - access token never expire(Notion api);
                            // Api import settings that request is generated from not valid
                            throw error;
                        }
                        else {
                            // Try to refresh access token
                            try {
                                await this.oAuth2RefreshTokenHelper.refresh(connection);
                            }
                            catch (error) {
                                // The error while refreshing access token.
                                // That means that refresh token was expired.
                                return connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED;
                            }
                            // Send request with refreshed access token.
                            // If request fails - Api import settings not valid
                            const updatedImport = await this.processesRepository.load(importId);
                            await this.sendRequest(updatedImport);
                            return connection_state_enum_1.ConnectionState.CONNECTED;
                        }
                    }
                }
            }
            else {
                await this.sendRequest(impt);
                return connection_state_enum_1.ConnectionState.CONNECTED;
            }
        }
        catch (error) {
            throw new Error(`Error while connecting to API: ${error.message}`);
        }
    }
    async sendRequest(impt) {
        const { transferMethod } = impt;
        const apiConnector = new api_connector_1.default(impt);
        await apiConnector.authRequest();
        switch (transferMethod) {
            case transfer_method_enum_1.TransferMethod.CHUNK: {
                await apiConnector.sendRequest();
                break;
            }
            case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                const pagination = {
                    offset: 0,
                    limit: 1
                };
                apiConnector.paginateRequest(pagination);
                await apiConnector.sendRequest();
                break;
            }
            case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                const pagination = {
                    limit: 1
                };
                apiConnector.paginateRequest(pagination);
                await apiConnector.sendRequest();
                break;
            }
            default: {
                throw new Error(`Unknown API transfer method: '${transferMethod}'.`);
            }
        }
    }
}
exports.default = ApiConnectionHelper;
//# sourceMappingURL=api-connection.helper.js.map
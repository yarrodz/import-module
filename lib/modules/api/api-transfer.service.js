"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const connection_state_enum_1 = require("./enums/connection-state.enum");
const transfer_status_enum_1 = require("../transfers/enums/transfer-status.enum");
const context_action_enum_1 = require("../imports/enums/context-action-enum");
class ApiTransferService {
    constructor(apiConnectionHelper, apiImportHelper, oAuth2AuthUriHelper, processesRepository, transfersRepository) {
        this.apiConnectionHelper = apiConnectionHelper;
        this.apiImportHelper = apiImportHelper;
        this.oAuth2AuthUriHelper = oAuth2AuthUriHelper;
        this.processesRepository = processesRepository;
        this.transfersRepository = transfersRepository;
    }
    async reload(req, impt, transfer) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const connection = impt.__.hasConnection;
            const { id: connectionId } = connection;
            const { id: transferId } = transfer;
            const context = {
                action: context_action_enum_1.ContextAction.RELOAD,
                connectionId,
                importId,
                transferId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, connection, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.load(importId);
            const reloadedTransfer = await this.transfersRepository.update({
                id: transferId,
                status: transfer_status_enum_1.TransferStatus.PENDING
            });
            this.apiImportHelper.import({
                import: updatedImport,
                transfer: reloadedTransfer
            });
            responseHandler.setSuccess(200, transferId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async retry(req, impt, transfer) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const connection = impt.__.hasConnection;
            const { id: connectionId } = connection;
            const { id: transferId } = transfer;
            const context = {
                action: context_action_enum_1.ContextAction.RETRY,
                connectionId,
                importId,
                transferId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, connection, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.load(importId);
            const retriedTransfer = await this.transfersRepository.update({
                id: transferId,
                retryAttempts: 0,
                status: transfer_status_enum_1.TransferStatus.PENDING
            });
            this.apiImportHelper.import({
                import: updatedImport,
                transfer: retriedTransfer
            });
            responseHandler.setSuccess(200, transferId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = ApiTransferService;
//# sourceMappingURL=api-transfer.service.js.map
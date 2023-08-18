"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const transfer_type_enum_1 = require("../transfers/enums/transfer-type.enum");
const transfer_status_enum_1 = require("../transfers/enums/transfer-status.enum");
const connection_state_enum_1 = require("./enums/connection-state.enum");
const context_action_enum_1 = require("../imports/enums/context-action-enum");
class ApiImportService {
    constructor(apiConnectionHelper, apiColumnsHelper, apiImportHelper, oAuth2AuthUriHelper, processesRepository, transfersRepository) {
        this.apiConnectionHelper = apiConnectionHelper;
        this.apiColumnsHelper = apiColumnsHelper;
        this.apiImportHelper = apiImportHelper;
        this.oAuth2AuthUriHelper = oAuth2AuthUriHelper;
        this.processesRepository = processesRepository;
        this.transfersRepository = transfersRepository;
    }
    async getColumns(req, impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const connection = impt.__.hasConnection;
            const { id: connectionId } = connection;
            const context = {
                action: context_action_enum_1.ContextAction.GET_COLUMNS,
                connectionId,
                importId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, connection, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.load(importId);
            const columns = await this.apiColumnsHelper.find(updatedImport);
            responseHandler.setSuccess(200, columns);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async checkIdColumnUniqueness(req, impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const connection = impt.__.hasConnection;
            const { id: connectionId } = connection;
            const context = {
                action: context_action_enum_1.ContextAction.GET_COLUMNS,
                connectionId,
                importId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, connection, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.load(importId);
            const idColumnUnique = await this.apiColumnsHelper.checkIdColumnUniqueness(updatedImport);
            responseHandler.setSuccess(200, idColumnUnique);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async import(req, impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const { transferMethod } = impt;
            const connection = impt.__.hasConnection;
            const { id: connectionId } = connection;
            const unit = impt.__.inUnit;
            const { id: unitId } = unit;
            const context = {
                action: context_action_enum_1.ContextAction.IMPORT,
                connectionId,
                importId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, connection, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.load(importId);
            const transfer = await this.transfersRepository.create({
                type: transfer_type_enum_1.TransferType.IMPORT,
                method: transferMethod,
                status: transfer_status_enum_1.TransferStatus.PENDING,
                offset: 0,
                transferedDatasetsCount: 0,
                log: [],
                retryAttempts: 0,
                __: {
                    inImport: {
                        id: importId,
                        _d: 'out'
                    },
                    inUnit: {
                        id: unitId,
                        _d: 'out'
                    }
                }
            });
            this.apiImportHelper.import({
                import: updatedImport,
                transfer
            });
            const { id: transferId } = transfer;
            responseHandler.setSuccess(200, transferId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = ApiImportService;
//# sourceMappingURL=api-import.service.js.map
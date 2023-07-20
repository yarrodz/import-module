"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const import_context_action_enum_1 = require("../imports/enums/import-context-action.enum");
const connection_state_enum_1 = require("../connection/connection-state.enum");
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
class ApiImportService {
    constructor(apiConnectionHelper, apiColumnsHelper, apiTransferHelper, oAuth2AuthUriHelper, importProcessesRepository, importsRepository) {
        this.apiConnectionHelper = apiConnectionHelper;
        this.apiColumnsHelper = apiColumnsHelper;
        this.apiTransferHelper = apiTransferHelper;
        this.oAuth2AuthUriHelper = oAuth2AuthUriHelper;
        this.importProcessesRepository = importProcessesRepository;
        this.importsRepository = importsRepository;
    }
    async connect(req, impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const context = {
                action: import_context_action_enum_1.ImportContextAction.CONNECT,
                importId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, impt, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.importsRepository.findById(importId);
            const idColumnUnique = await this.apiColumnsHelper.checkIdColumnUniqueness(updatedImport);
            if (!idColumnUnique) {
                responseHandler.setError(409, 'Provided id column includes duplicate values');
                return responseHandler;
            }
            const columns = await this.apiColumnsHelper.find(updatedImport);
            responseHandler.setSuccess(200, {
                importId,
                columns
            });
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async start(req, impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const context = {
                action: import_context_action_enum_1.ImportContextAction.START,
                importId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, impt, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.importsRepository.findById(importId);
            const process = await this.importProcessesRepository.create({
                unit: impt.unit,
                import: importId
            });
            const { _id: processId } = process;
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.apiTransferHelper.transfer(updatedImport, process);
            responseHandler.setSuccess(200, processId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async reload(req, impt, process) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const { _id: processId } = process;
            const context = {
                action: import_context_action_enum_1.ImportContextAction.RELOAD,
                importId,
                processId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, impt, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.importsRepository.findById(importId);
            await this.importProcessesRepository.update(processId, {
                status: import_status_enum_1.ImportStatus.PENDING
            });
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.apiTransferHelper.transfer(updatedImport, process);
            responseHandler.setSuccess(200, processId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async retry(req, impt, process) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const { _id: processId } = process;
            const context = {
                action: import_context_action_enum_1.ImportContextAction.RELOAD,
                importId,
                processId
            };
            const connectionState = await this.apiConnectionHelper.connect(impt);
            if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                const oAuth2AuthUri = await this.oAuth2AuthUriHelper.createUri(req, impt, context);
                responseHandler.setSuccess(201, oAuth2AuthUri);
                return responseHandler;
            }
            const updatedImport = await this.importsRepository.findById(importId);
            await this.importProcessesRepository.update(processId, {
                attempts: 0,
                status: import_status_enum_1.ImportStatus.PENDING,
                errorMessage: null
            });
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.apiTransferHelper.transfer(updatedImport, process);
            responseHandler.setSuccess(200, processId);
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
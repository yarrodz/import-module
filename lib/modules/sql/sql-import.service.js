"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
class SqlImportService {
    constructor(sqlColumnsHelper, sqlTransferHelper, importProcessesRepository) {
        this.sqlColumnsHelper = sqlColumnsHelper;
        this.sqlTransferHelper = sqlTransferHelper;
        this.importProcessesRepository = importProcessesRepository;
    }
    async connect(impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const idColumnUnique = await this.sqlColumnsHelper.checkIdColumnUniqueness(impt);
            if (!idColumnUnique) {
                responseHandler.setError(409, 'Provided id column includes duplicate values');
                return responseHandler;
            }
            const columns = await this.sqlColumnsHelper.find(impt);
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
    async start(impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const process = await this.importProcessesRepository.create({
                unit: impt.unit,
                import: importId
            });
            const { _id: processId } = process;
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.sqlTransferHelper.transfer(impt, process);
            responseHandler.setSuccess(200, processId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async reload(impt, process) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const { _id: processId } = process;
            await this.importProcessesRepository.update(processId, {
                status: import_status_enum_1.ImportStatus.PENDING
            });
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.sqlTransferHelper.transfer(impt, process);
            responseHandler.setSuccess(200, processId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async retry(impt, process) {
        const responseHandler = new response_handler_1.default();
        try {
            const { _id: importId } = impt;
            const { _id: processId } = process;
            await this.importProcessesRepository.update(processId, {
                attempts: 0,
                status: import_status_enum_1.ImportStatus.PENDING,
                errorMessage: null
            });
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.sqlTransferHelper.transfer(impt, process);
            responseHandler.setSuccess(200, processId);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = SqlImportService;
//# sourceMappingURL=sql-import.service.js.map
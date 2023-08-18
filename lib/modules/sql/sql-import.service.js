"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const transfer_type_enum_1 = require("../transfers/enums/transfer-type.enum");
const transfer_method_enum_1 = require("../transfers/enums/transfer-method.enum");
const transfer_status_enum_1 = require("../transfers/enums/transfer-status.enum");
class SqlImportService {
    constructor(sqlColumnsHelper, sqlImportHelper, transefersRepository) {
        this.sqlColumnsHelper = sqlColumnsHelper;
        this.sqlImportHelper = sqlImportHelper;
        this.transfersRepository = transefersRepository;
    }
    async getColumns(impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const columns = await this.sqlColumnsHelper.find(impt);
            responseHandler.setSuccess(200, columns);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async checkIdColumnUniqueness(impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const idColumnUnique = await this.sqlColumnsHelper.checkIdColumnUniqueness(impt);
            responseHandler.setSuccess(200, idColumnUnique);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async import(impt) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: importId } = impt;
            const unit = impt.__.inUnit;
            const { id: unitId } = unit;
            const transfer = await this.transfersRepository.create({
                type: transfer_type_enum_1.TransferType.IMPORT,
                method: transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION,
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
            this.sqlImportHelper.import({
                import: impt,
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
exports.default = SqlImportService;
//# sourceMappingURL=sql-import.service.js.map
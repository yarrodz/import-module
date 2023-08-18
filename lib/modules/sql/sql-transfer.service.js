"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const transfer_status_enum_1 = require("../transfers/enums/transfer-status.enum");
class SqlTransferService {
    constructor(sqlImportHelper, transfersRepository) {
        this.sqlImportHelper = sqlImportHelper;
        this.transfersRepository = transfersRepository;
    }
    async reload(impt, transfer) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: transferId } = transfer;
            const reloadedTransfer = await this.transfersRepository.update({
                id: transferId,
                status: transfer_status_enum_1.TransferStatus.PENDING
            });
            this.sqlImportHelper.import({
                import: impt,
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
    async retry(impt, transfer) {
        const responseHandler = new response_handler_1.default();
        try {
            const { id: transferId } = transfer;
            const retriedTransfer = await this.transfersRepository.update({
                id: transferId,
                status: transfer_status_enum_1.TransferStatus.PENDING,
                retryAttempts: 0
            });
            this.sqlImportHelper.import({
                import: impt,
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
exports.default = SqlTransferService;
//# sourceMappingURL=sql-transfer.service.js.map
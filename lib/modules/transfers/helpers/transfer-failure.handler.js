"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_status_enum_1 = require("../enums/transfer-status.enum");
const sleep_1 = __importDefault(require("../../../utils/sleep/sleep"));
class TransferFailureHandler {
    constructor(io, transfersRepository) {
        this.io = io;
        this.transfersRepository = transfersRepository;
    }
    async handle(params) {
        const { error, outerTransferFunction, import: impt, transfer } = params;
        const { id: transferId } = transfer;
        const { retryOptions } = impt;
        const { maxAttempts, attemptTimeDelay } = retryOptions;
        const refreshedTransfer = await this.transfersRepository.load(transferId);
        const { retryAttempts } = refreshedTransfer;
        switch (retryAttempts) {
            case maxAttempts:
                await this.failTransfer(error, refreshedTransfer);
                break;
            default:
                await this.retryTransfer(error, outerTransferFunction, impt, refreshedTransfer, attemptTimeDelay);
                break;
        }
    }
    async failTransfer(error, transfer) {
        const { id: transferId, log } = transfer;
        log.unshift(`Transfer was failed with error: ${error.message}`);
        const failedTransfer = await this.transfersRepository.update({
            id: transferId,
            status: transfer_status_enum_1.TransferStatus.FAILED,
            log
        });
        this.io.to(String(transferId)).emit('transfer', {
            ...failedTransfer,
            log: failedTransfer.log[0] || []
        });
    }
    async retryTransfer(error, outerTransferFunction, impt, transfer, attemptTimeDelay) {
        let { id: transferId, log, retryAttempts } = transfer;
        retryAttempts++;
        log.unshift(`Transfer was failed with error: ${error.message}. Retrying transfer after ${attemptTimeDelay}ms. ${retryAttempts} retry attempts left.`);
        const retriedTransfer = await this.transfersRepository.update({
            id: transferId,
            retryAttempts,
            log
        });
        this.io.to(String(transferId)).emit('transfer', {
            ...retriedTransfer,
            log: retriedTransfer.log[0] || []
        });
        await (0, sleep_1.default)(attemptTimeDelay);
        await outerTransferFunction({
            import: impt,
            transfer: retriedTransfer
        });
    }
}
exports.default = TransferFailureHandler;
//# sourceMappingURL=transfer-failure.handler.js.map
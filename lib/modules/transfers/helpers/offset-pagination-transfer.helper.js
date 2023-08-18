"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_status_enum_1 = require("../enums/transfer-status.enum");
const sleep_1 = __importDefault(require("../../../utils/sleep/sleep"));
class OffsetPaginationTransferHelper {
    constructor(io, importStepHelper, transfersRepository) {
        this.io = io;
        this.importStepHelper = importStepHelper;
        this.transfersRepository = transfersRepository;
    }
    async transfer(params) {
        const { import: impt, transfer, limitPerStep, paginationFunction } = params;
        const { fn: paginationFn, params: paginationFnParams } = paginationFunction;
        const { limitRequestsPerSecond } = impt;
        let { id: transferId, datasetsCount } = transfer;
        let datasets = [];
        let requestCounter = 0;
        let requestsExectionTime = 0;
        do {
            const stepStartDate = new Date();
            const refreshedTransfer = await this.transfersRepository.load(transferId);
            if (refreshedTransfer.status === transfer_status_enum_1.TransferStatus.PAUSED) {
                this.io.to(String(transferId)).emit('transfer', {
                    ...refreshedTransfer,
                    log: refreshedTransfer.log[0] || []
                });
                return;
            }
            const offset = refreshedTransfer.offset;
            if (datasetsCount && offset >= datasetsCount) {
                break;
            }
            const offsetPagination = {
                offset,
                limit: limitPerStep
            };
            datasets = await paginationFn(offsetPagination, ...paginationFnParams);
            if (datasets.length === 0) {
                break;
            }
            await this.importStepHelper.step(impt, refreshedTransfer, datasets);
            const stepEndDate = new Date();
            const stepExectionTime = stepEndDate.getTime() - stepStartDate.getTime();
            requestCounter++;
            requestsExectionTime += stepExectionTime;
            if (requestCounter === limitRequestsPerSecond) {
                requestCounter = 0;
                if (requestsExectionTime < 1000) {
                    const remainingToSecond = 1000 - requestsExectionTime;
                    await (0, sleep_1.default)(remainingToSecond);
                }
            }
        } while (datasets.length);
        const completedTransfer = await this.transfersRepository.update({
            id: transferId,
            status: transfer_status_enum_1.TransferStatus.COMPLETED
        });
        this.io.to(String(transferId)).emit('transfer', {
            ...completedTransfer,
            log: completedTransfer.log[0] || []
        });
    }
}
exports.default = OffsetPaginationTransferHelper;
//# sourceMappingURL=offset-pagination-transfer.helper.js.map
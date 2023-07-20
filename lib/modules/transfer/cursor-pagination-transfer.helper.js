"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
const sleep_1 = __importDefault(require("../../utils/sleep/sleep"));
class CursorPaginationTransferHelper {
    constructor(io, transferStepHelper, importProcessesRepository) {
        this.io = io;
        this.transferStepHelper = transferStepHelper;
        this.importProcessesRepository = importProcessesRepository;
    }
    async cursorPaginationTransfer(impt, processId, limit, cursorPaginationFunction, ...cursorPaginationFunctionParams) {
        const { limitRequestsPerSecond } = impt;
        const prosess = await this.importProcessesRepository.findById(processId);
        let { processedDatasetsCount, datasetsCount } = prosess;
        while (processedDatasetsCount < datasetsCount) {
            let requestCounter = 0;
            const startDate = new Date();
            while (requestCounter < limitRequestsPerSecond) {
                requestCounter++;
                const refreshedProcess = await this.importProcessesRepository.findById(processId);
                if (refreshedProcess.status === import_status_enum_1.ImportStatus.PAUSED) {
                    this.io
                        .to(processId.toString())
                        .emit('importProcess', refreshedProcess);
                    return;
                }
                processedDatasetsCount = refreshedProcess.processedDatasetsCount;
                if (processedDatasetsCount >= datasetsCount) {
                    break;
                }
                const cursorPagination = {
                    cursor: refreshedProcess.cursor,
                    limit
                };
                const { cursor, datasets } = await cursorPaginationFunction(cursorPagination, ...cursorPaginationFunctionParams);
                await this.transferStepHelper.transferStep(impt, processId, datasets, cursor);
                if (!cursor || datasets.length === 0) {
                    break;
                }
            }
            const endDate = new Date();
            const requestsExectionTime = endDate.getTime() - startDate.getTime();
            // console.log('requestsExectionTime: ', requestsExectionTime);
            // console.log('----------------');
            // If step executed faster than second. we have to wait for the remaining time so that there is a second in the sum
            if (requestsExectionTime < 1000) {
                const remainingToSecond = 1000 - requestsExectionTime;
                // console.log('remainingToSecond: ', remainingToSecond);
                await (0, sleep_1.default)(remainingToSecond);
            }
        }
        const completedProcess = await this.importProcessesRepository.update(processId, {
            status: import_status_enum_1.ImportStatus.COMPLETED,
            errorMessage: null
        });
        this.io.to(processId.toString()).emit('importProcess', completedProcess);
    }
}
exports.default = CursorPaginationTransferHelper;
//# sourceMappingURL=cursor-pagination-transfer.helper.js.map
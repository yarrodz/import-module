"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
const sleep_1 = __importDefault(require("../../utils/sleep/sleep"));
class ImportTransferFailureHandler {
    constructor(io, importProcessesRepository, maxAttempts, attemptDelayTime) {
        this.io = io;
        this.importProcessesRepository = importProcessesRepository;
        this.maxAttempts = maxAttempts;
        this.attemptDelayTime = attemptDelayTime;
    }
    async handle(error, importTransferFunction, impt, process) {
        const { _id: processId } = process;
        const refreshedProcess = await this.importProcessesRepository.findById(processId);
        const { attempts } = refreshedProcess;
        switch (attempts) {
            case this.maxAttempts:
                await this.failImportTransfer(error, processId);
                break;
            default:
                await this.retryImportTransfer(importTransferFunction, impt, refreshedProcess);
                break;
        }
    }
    async failImportTransfer(error, processId) {
        const failedProcess = await this.importProcessesRepository.update(processId, {
            status: import_status_enum_1.ImportStatus.FAILED,
            errorMessage: error.message
        });
        this.io.to(processId.toString()).emit('importProcess', failedProcess);
    }
    async retryImportTransfer(importTransferFunction, impt, process) {
        const { _id: processId } = process;
        await this.importProcessesRepository.update(processId, {
            $inc: { attempts: 1 }
        });
        await (0, sleep_1.default)(this.attemptDelayTime);
        await importTransferFunction(impt, process);
    }
}
exports.default = ImportTransferFailureHandler;
//# sourceMappingURL=import-transfer-failure.handler.js.map
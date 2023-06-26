"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_source_enum_1 = require("../imports/enums/import-source.enum");
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
class TransferService {
    constructor(io, importProcessesRepository, transferSQLService, maxAttempts, attemptDelayTime, limit) {
        (this.io = io),
            (this.importProcessesRepository = importProcessesRepository);
        this.transferSQLService = transferSQLService;
        this.maxAttempts = maxAttempts;
        this.attemptDelayTime = attemptDelayTime;
        this.limit = limit;
    }
    async transfer(impt, process) {
        try {
            await this.run(impt, process);
        }
        catch (error) {
            return this.handleTranserFailure(error, impt, process);
        }
    }
    async run(impt, process) {
        switch (impt.source) {
            case import_source_enum_1.ImportSource.MYSQL:
            case import_source_enum_1.ImportSource.POSTGRESQL:
            case import_source_enum_1.ImportSource.MICROSOFT_SQL_SERVER:
            case import_source_enum_1.ImportSource.ORACLE:
            case import_source_enum_1.ImportSource.MARIADB:
                await this.transferSQLService.transfer(impt, process, this.limit);
                break;
            // case ImportSource.API:
            //   await this.transferApi(impt, processId);
            //   break;
            // case ImportSource.IMAP:
            //   await imapImport(impt, processId);
            //   break;
            default:
                throw new Error('Unexpected import source');
        }
    }
    async handleTranserFailure(error, impt, process) {
        const refreshedProcess = await this.importProcessesRepository.findById(process._id);
        switch (refreshedProcess.attempts) {
            case this.maxAttempts:
                await this.failTransferProcess(error, process);
                break;
            default:
                await this.retryTransferProcess(impt, process);
                break;
        }
    }
    async failTransferProcess(error, process) {
        const failedProcess = await this.importProcessesRepository.update(process._id, {
            status: import_status_enum_1.ImportStatus.FAILED,
            errorMessage: error.message
        });
        this.io.to(process._id.toString()).emit('importProcess', failedProcess);
    }
    async retryTransferProcess(impt, process) {
        await this.importProcessesRepository.update(process._id, {
            $inc: { attempts: 1 }
        });
        await this.delayAttempt();
        return await this.transfer(impt, process);
    }
    async delayAttempt() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(undefined), this.attemptDelayTime);
        });
    }
}
exports.default = TransferService;
//# sourceMappingURL=transfer.service.js.map
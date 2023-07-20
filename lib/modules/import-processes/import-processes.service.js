"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const import_status_enum_1 = require("./enums/import-status.enum");
const import_source_enum_1 = require("../imports/enums/import-source.enum");
class ImportProcessesService {
    constructor(importProcessesRepository, importsRepository, sqlImportService, apiImportService) {
        this.importProcessesRepository = importProcessesRepository;
        this.importsRepository = importsRepository;
        this.sqlImportService = sqlImportService;
        this.apiImportService = apiImportService;
    }
    async findAll(unit) {
        const responseHandler = new response_handler_1.default();
        try {
            const processes = await this.importProcessesRepository.findAll(unit);
            responseHandler.setSuccess(200, processes);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async delete(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const process = await this.importProcessesRepository.findById(id);
            if (!process) {
                responseHandler.setError(404, 'Import process not found');
                return responseHandler;
            }
            if (process.status === import_status_enum_1.ImportStatus.PENDING) {
                responseHandler.setError(409, 'Pending import process cannot be deleted');
                return responseHandler;
            }
            await this.importProcessesRepository.delete(id);
            responseHandler.setSuccess(200, true);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async pause(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const process = await this.importProcessesRepository.findById(id);
            if (!process) {
                responseHandler.setError(404, 'Import process not found');
                return responseHandler;
            }
            if (process.status !== import_status_enum_1.ImportStatus.PENDING) {
                responseHandler.setError(409, 'Only pending import process can be paused');
                return responseHandler;
            }
            await this.importProcessesRepository.update(id, {
                status: import_status_enum_1.ImportStatus.PAUSED
            });
            responseHandler.setSuccess(200, true);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async reload(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const process = await this.importProcessesRepository.findById(id);
            if (!process) {
                responseHandler.setError(404, 'Import process not found');
                return responseHandler;
            }
            if (process.status !== import_status_enum_1.ImportStatus.PAUSED) {
                responseHandler.setError(409, 'Only paused import process can be reloaded');
                return responseHandler;
            }
            const impt = await this.importsRepository.findById(process.import.toString());
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const pendingImport = await this.importProcessesRepository.findPendingByUnit(impt.unit);
            if (pendingImport) {
                responseHandler.setError(409, 'This unit is currently processing another import');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.reload(impt, process);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.reload(req, impt, process);
                }
                default: {
                    responseHandler.setError(400, `Error while reloading import. Unknown import source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async retry(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const process = await this.importProcessesRepository.findById(id);
            if (!process) {
                responseHandler.setError(404, 'Import process not found');
                return responseHandler;
            }
            if (process.status !== import_status_enum_1.ImportStatus.FAILED) {
                responseHandler.setError(409, 'Only failed import process can be retried');
                return responseHandler;
            }
            const impt = await this.importsRepository.findById(process.import.toString());
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.retry(impt, process);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.retry(req, impt, process);
                }
                default: {
                    responseHandler.setError(400, `Error while reloading import. Unknown import source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = ImportProcessesService;
//# sourceMappingURL=import-processes.service.js.map
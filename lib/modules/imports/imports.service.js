"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const import_validator_1 = require("./import.validator");
const field_validator_1 = require("./validators/field.validator");
const import_source_enum_1 = require("./enums/import-source.enum");
class ImportsService {
    constructor(importsRepository, importProcessesRepository, sqlImportService, apiImportService) {
        this.importsRepository = importsRepository;
        this.importProcessesRepository = importProcessesRepository;
        this.sqlImportService = sqlImportService;
        this.apiImportService = apiImportService;
    }
    async findAll(unit) {
        const responseHandler = new response_handler_1.default();
        try {
            const imports = await this.importsRepository.findAll(unit);
            responseHandler.setSuccess(200, imports);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async create(req, createImportInput) {
        let responseHandler = new response_handler_1.default();
        try {
            const { error } = import_validator_1.ImportValidator.validate(createImportInput);
            if (error) {
                responseHandler.setError(400, error);
                return responseHandler;
            }
            const impt = await this.importsRepository.create(createImportInput);
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.connect(impt);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.connect(req, impt);
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown import source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async update(req, id, updateImportInput) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { error } = import_validator_1.ImportValidator.validate(updateImportInput);
            if (error) {
                responseHandler.setError(400, error);
                return responseHandler;
            }
            const updatedImport = await this.importsRepository.update(id, updateImportInput);
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.connect(updatedImport);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.connect(req, updatedImport);
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown import source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async delete(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            await this.importsRepository.delete(id);
            responseHandler.setSuccess(200, true);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async connect(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.connect(impt);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.connect(req, impt);
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown import source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async setFields(id, fieldInputs) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const errorsArray = fieldInputs.map((fieldInput) => {
                const { error } = field_validator_1.FieldValidator.validate(fieldInput);
                return error;
            });
            for (let error of errorsArray) {
                if (error) {
                    responseHandler.setError(400, error);
                    return responseHandler;
                }
            }
            const updatedImport = await this.importsRepository.update(id, {
                fields: fieldInputs
            });
            responseHandler.setSuccess(200, updatedImport);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async start(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const pendingImport = await this.importProcessesRepository.findPendingByUnit(impt.unit.toString());
            if (pendingImport) {
                responseHandler.setError(409, 'This unit is currently processing another import');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    return await this.sqlImportService.start(impt);
                }
                case import_source_enum_1.ImportSource.API: {
                    return await this.apiImportService.start(req, impt);
                }
                default: {
                    responseHandler.setError(400, `Error while starting import. Unknown import source '${source}'.`);
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
exports.default = ImportsService;
//# sourceMappingURL=imports.service.js.map
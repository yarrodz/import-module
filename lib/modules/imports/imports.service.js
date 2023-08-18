"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const source_enum_1 = require("./enums/source.enum");
const create_sql_import_validator_1 = require("../sql/validators/create-sql-import.validator");
const create_api_import_validator_1 = require("../api/validators/create-api-import.validator");
const update_sql_import_validator_1 = require("../sql/validators/update-sql-import.validator");
const update_api_import_validator_1 = require("../api/validators/update-api-import.validator");
const transfer_status_enum_1 = require("../transfers/enums/transfer-status.enum");
class ImportsService {
    constructor(sqlImportService, apiImportService, processesRepository, transfersRepository) {
        this.sqlImportService = sqlImportService;
        this.apiImportService = apiImportService;
        this.processesRepository = processesRepository;
        this.transfersRepository = transfersRepository;
    }
    async getAll(select, sortings) {
        const responseHandler = new response_handler_1.default();
        try {
            const imports = await this.processesRepository.query(select, sortings, false);
            responseHandler.setSuccess(200, imports);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async get(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.processesRepository.load(id);
            responseHandler.setSuccess(200, impt);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async create(input) {
        let responseHandler = new response_handler_1.default();
        try {
            const { source } = input;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    const { error } = create_sql_import_validator_1.CreateSqlImportValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                case source_enum_1.Source.API: {
                    const { error } = create_api_import_validator_1.CreateApiImportValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
            const impt = await this.processesRepository.create(input);
            responseHandler.setSuccess(200, impt);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async update(input) {
        let responseHandler = new response_handler_1.default();
        try {
            const { source } = input;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    const { error } = update_sql_import_validator_1.UpdateSqlImportValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                case source_enum_1.Source.API: {
                    const { error } = update_api_import_validator_1.UpdateApiImportValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                default: {
                    responseHandler.setError(400, `Error while updating import. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
            const { id } = input;
            const impt = await this.processesRepository.load(id);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const updatedImport = await this.processesRepository.update(input);
            responseHandler.setSuccess(200, updatedImport);
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
            const impt = await this.processesRepository.load(id);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            await this.processesRepository.delete(id);
            responseHandler.setSuccess(200, true);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async getColumns(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.processesRepository.load(id);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    return await this.sqlImportService.getColumns(impt);
                }
                case source_enum_1.Source.API: {
                    return await this.apiImportService.getColumns(req, impt);
                }
                default: {
                    responseHandler.setError(400, `Error while getting columns. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async checkIdColumnUniqueness(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.processesRepository.load(id);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    return await this.sqlImportService.checkIdColumnUniqueness(impt);
                }
                case source_enum_1.Source.API: {
                    return await this.apiImportService.checkIdColumnUniqueness(req, impt);
                }
                default: {
                    responseHandler.setError(400, `Error while getting columns. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async import(req, id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.processesRepository.load(id);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { fields } = impt;
            if (fields === undefined) {
                responseHandler.setError(400, 'Fields for import not set.');
                return responseHandler;
            }
            const { id: unitId } = impt.__.inUnit;
            const pendingUnitTransfer = await this.transfersRepository.query({
                operator: 'and',
                conditions: [
                    {
                        type: 'equals',
                        property: 'status',
                        value: transfer_status_enum_1.TransferStatus.PENDING
                    },
                    {
                        type: 'inEdge',
                        label: 'inUnit',
                        value: unitId
                    }
                ]
            }, {}, true);
            if (pendingUnitTransfer) {
                responseHandler.setError(409, 'This unit is already processing another transfer.');
                return responseHandler;
            }
            const { source } = impt;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    return await this.sqlImportService.import(impt);
                }
                case source_enum_1.Source.API: {
                    return await this.apiImportService.import(req, impt);
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
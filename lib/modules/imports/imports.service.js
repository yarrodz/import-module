"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const field_validator_1 = require("./validators/field.validator");
const create_update_import_validator_1 = require("./validators/create-update-import.validator");
class ImportsService {
    constructor(importsRepository, importProcessesRepository, columnsService, transferService) {
        this.importsRepository = importsRepository;
        this.importProcessesRepository = importProcessesRepository;
        this.columnsService = columnsService;
        this.transferService = transferService;
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
    async create(createImportInput) {
        const responseHandler = new response_handler_1.default();
        try {
            const { error } = create_update_import_validator_1.CreateUpdateImportValidator.validate(createImportInput);
            if (error) {
                responseHandler.setError(400, error);
                return responseHandler;
            }
            const columns = await this.columnsService.find(createImportInput);
            const idColumnUnique = await this.columnsService.checkIdColumnUniqueness(createImportInput);
            if (!idColumnUnique) {
                responseHandler.setError(409, 'Provided id column includes duplicate values');
                return responseHandler;
            }
            const impt = await this.importsRepository.create(createImportInput);
            responseHandler.setSuccess(200, {
                importId: impt._id,
                columns
            });
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async update(id, updateImportInput) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { error } = create_update_import_validator_1.CreateUpdateImportValidator.validate(updateImportInput);
            if (error) {
                responseHandler.setError(400, error);
                return responseHandler;
            }
            const columns = await this.columnsService.find(updateImportInput);
            const idColumnUnique = await this.columnsService.checkIdColumnUniqueness(updateImportInput);
            if (!idColumnUnique) {
                responseHandler.setError(409, 'Provided id column includes duplicate values');
                return responseHandler;
            }
            await this.importsRepository.update(id, updateImportInput);
            responseHandler.setSuccess(200, {
                importId: impt._id,
                columns
            });
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
    async connect(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const columns = await this.columnsService.find(impt);
            responseHandler.setSuccess(200, {
                importId: impt._id,
                columns
            });
            return responseHandler;
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
    async start(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const impt = await this.importsRepository.findById(id);
            if (!impt) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const idColumnUnique = await this.columnsService.checkIdColumnUniqueness(impt);
            if (!idColumnUnique) {
                responseHandler.setError(409, 'Provided id column includes duplicate values');
                return responseHandler;
            }
            const pendingImport = await this.importProcessesRepository.findPendingByUnit(impt.unit.toString());
            if (pendingImport) {
                responseHandler.setError(409, 'This unit is currently processing another import');
                return responseHandler;
            }
            const process = await this.importProcessesRepository.create({
                unit: impt.unit,
                import: impt._id
            });
            // We dont need to wait till import executes,
            // We send of id import process
            // Client send websocket request and then sends event 'join' with processId
            this.transferService.transfer(impt, process);
            responseHandler.setSuccess(200, process._id);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = ImportsService;
//# sourceMappingURL=imports.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const transfer_status_enum_1 = require("./enums/transfer-status.enum");
const source_enum_1 = require("../imports/enums/source.enum");
class TransfersService {
    constructor(sqlTransferService, apiTransferService, transfersRepository, processesRepository) {
        this.sqlTransferService = sqlTransferService;
        this.apiTransferService = apiTransferService;
        this.transfersRepository = transfersRepository;
        this.processesRepository = processesRepository;
    }
    async getAll(select, sortings) {
        const responseHandler = new response_handler_1.default();
        try {
            const transfers = await this.transfersRepository.query(select, sortings, false);
            responseHandler.setSuccess(200, transfers);
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
            const transfer = await this.transfersRepository.load(id);
            if (transfer === undefined) {
                responseHandler.setError(404, 'Transfer not found');
                return responseHandler;
            }
            if (transfer.status === transfer_status_enum_1.TransferStatus.PENDING) {
                responseHandler.setError(409, 'Pending import process cannot be deleted');
                return responseHandler;
            }
            await this.transfersRepository.delete(id);
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
            const transfer = await this.transfersRepository.load(id);
            if (transfer === undefined) {
                responseHandler.setError(404, 'Transfer not found');
                return responseHandler;
            }
            if (transfer.status !== transfer_status_enum_1.TransferStatus.PENDING) {
                responseHandler.setError(409, 'Only pending transfer process can be paused');
                return responseHandler;
            }
            await this.transfersRepository.update({
                id,
                status: transfer_status_enum_1.TransferStatus.PAUSED
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
            const transfer = await this.transfersRepository.load(id);
            if (transfer === undefined) {
                responseHandler.setError(404, 'Transfer not found');
                return responseHandler;
            }
            if (transfer.status !== transfer_status_enum_1.TransferStatus.PAUSED) {
                responseHandler.setError(409, 'Only paused transfer can be reloaded');
                return responseHandler;
            }
            const { id: importId } = transfer.__.inImport;
            const impt = await this.processesRepository.load(importId);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { id: unitId } = transfer.__.inUnit;
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
            const updatedTransfer = await this.transfersRepository.update({
                id,
                status: transfer_status_enum_1.TransferStatus.PENDING
            });
            const { source } = impt;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    return await this.sqlTransferService.reload(impt, updatedTransfer);
                }
                case source_enum_1.Source.API: {
                    return await this.apiTransferService.reload(req, impt, updatedTransfer);
                }
                default: {
                    responseHandler.setError(400, `Error while reloading import. Unknown source '${source}'.`);
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
            const transfer = await this.transfersRepository.load(id);
            if (transfer === undefined) {
                responseHandler.setError(404, 'Transfer not found');
                return responseHandler;
            }
            if (transfer.status !== transfer_status_enum_1.TransferStatus.FAILED) {
                responseHandler.setError(409, 'Only failed transfer can be retried');
                return responseHandler;
            }
            const { id: importId } = transfer.__.inImport;
            const impt = await this.processesRepository.load(importId);
            if (impt === undefined) {
                responseHandler.setError(404, 'Import not found');
                return responseHandler;
            }
            const { id: unitId } = transfer.__.inUnit;
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
            const updatedTransfer = await this.transfersRepository.update({
                id,
                status: transfer_status_enum_1.TransferStatus.PENDING
            });
            const { source } = impt;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    return await this.sqlTransferService.retry(impt, updatedTransfer);
                }
                case source_enum_1.Source.API: {
                    return await this.apiTransferService.retry(req, impt, updatedTransfer);
                }
                default: {
                    responseHandler.setError(400, `Error while retrieng transfer. Unknown source '${source}'.`);
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
exports.default = TransfersService;
//# sourceMappingURL=transfers.service.js.map
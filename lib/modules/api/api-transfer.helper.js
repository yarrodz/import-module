"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_type_enum_1 = require("../transfer/enums/transfer-type.enum");
const api_connector_1 = __importDefault(require("./connector/api-connector"));
const resolve_path_1 = __importDefault(require("../../utils/resolve-path/resolve-path"));
const chunk_array_1 = __importDefault(require("../../utils/chunk-array/chunk-array"));
class ApiTransferHelper {
    constructor(importProcessesRepository, importTransferFailureHandler, chunkTransferHelper, offsetPaginationTransferHelper, cursorPaginationTransferHelper) {
        this.transfer = async (impt, process) => {
            try {
                const { api } = impt;
                const { transferType } = api;
                const { _id: processId } = process;
                switch (transferType) {
                    case transfer_type_enum_1.TransferType.CHUNK: {
                        await this.chunkTransfer(impt, processId);
                        break;
                    }
                    case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                        await this.offsetPaginationTranfer(impt, processId);
                        break;
                    }
                    case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                        await this.cursorPaginationTranfer(impt, processId);
                        break;
                    }
                    default:
                        throw new Error(`Error while transfer. Unknown transfer type '${transferType}'.`);
                }
            }
            catch (error) {
                await this.importTransferFailureHandler.handle(error, this.transfer, impt, process);
            }
        };
        this.offetPaginationFunction = async (offsetPagination, apiConnector, datasetsPath) => {
            apiConnector.paginateRequest(offsetPagination);
            const data = await apiConnector.sendRequest();
            return (0, resolve_path_1.default)(data, datasetsPath);
        };
        this.cursorPaginationFunction = async (cursorPagination, apiConnector, cursorPath, datasetsPath) => {
            apiConnector.paginateRequest(cursorPagination);
            const data = await apiConnector.sendRequest();
            const cursor = (0, resolve_path_1.default)(data, cursorPath);
            const datasets = (0, resolve_path_1.default)(data, datasetsPath);
            return {
                cursor,
                datasets
            };
        };
        this.importProcessesRepository = importProcessesRepository;
        this.importTransferFailureHandler = importTransferFailureHandler;
        this.chunkTransferHelper = chunkTransferHelper;
        this.offsetPaginationTransferHelper = offsetPaginationTransferHelper;
        this.cursorPaginationTransferHelper = cursorPaginationTransferHelper;
    }
    async chunkTransfer(impt, processId) {
        const { api } = impt;
        const { datasetsPath } = api;
        const process = await this.importProcessesRepository.findById(processId);
        const offset = process.processedDatasetsCount;
        const apiConnector = new api_connector_1.default(api);
        await apiConnector.authorizeRequest();
        const response = await apiConnector.sendRequest();
        let datasets = (0, resolve_path_1.default)(response, datasetsPath);
        await this.importProcessesRepository.update(processId, {
            datasetsCount: datasets.length
        });
        datasets = datasets.slice(offset, datasets.length);
        let chunkedDatasets = (0, chunk_array_1.default)(datasets, 100);
        datasets = null;
        await this.chunkTransferHelper.chunkTransfer(impt, processId, chunkedDatasets);
    }
    async offsetPaginationTranfer(impt, processId) {
        const { api, datasetsCount } = impt;
        const { paginationOptions, datasetsPath } = api;
        const { limitValue } = paginationOptions;
        await this.importProcessesRepository.update(processId, { datasetsCount });
        const apiConnector = new api_connector_1.default(api);
        await apiConnector.authorizeRequest();
        await this.offsetPaginationTransferHelper.offsetPaginationTransfer(impt, processId, limitValue, this.offetPaginationFunction, apiConnector, datasetsPath);
    }
    async cursorPaginationTranfer(impt, processId) {
        const { api, datasetsCount } = impt;
        const { paginationOptions, datasetsPath } = api;
        const { limitValue, cursorParameterPath } = paginationOptions;
        await this.importProcessesRepository.update(processId, { datasetsCount });
        const apiConnector = new api_connector_1.default(api);
        await apiConnector.authorizeRequest();
        await this.cursorPaginationTransferHelper.cursorPaginationTransfer(impt, processId, limitValue, this.cursorPaginationFunction, apiConnector, cursorParameterPath, datasetsPath);
    }
}
exports.default = ApiTransferHelper;
//# sourceMappingURL=api-transfer.helper.js.map
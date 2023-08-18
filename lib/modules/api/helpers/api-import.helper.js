"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_connector_1 = __importDefault(require("../connector/api-connector"));
const connection_state_enum_1 = require("../enums/connection-state.enum");
const transfer_status_enum_1 = require("../../transfers/enums/transfer-status.enum");
const transfer_method_enum_1 = require("../../transfers/enums/transfer-method.enum");
const resolve_path_1 = __importDefault(require("../../../utils/resolve-path/resolve-path"));
class ApiImportHelper {
    constructor(apiConnectionHelper, transferFailureHandler, chunkTransferHelper, offsetPaginationTransferHelper, cursorPaginationTransferHelper, transfersRepository) {
        this.import = async (params) => {
            const impt = params.import;
            const { transferMethod } = impt;
            const { transfer } = params;
            const { id: transferId, log } = transfer;
            try {
                const connectionState = await this.apiConnectionHelper.connect(impt);
                if (connectionState === connection_state_enum_1.ConnectionState.OAUTH2_REQUIRED) {
                    log.unshift('Transfer was paused due OAuth2 authentication requirement.');
                    await this.transfersRepository.update({
                        id: transferId,
                        status: transfer_status_enum_1.TransferStatus.PAUSED,
                        log
                    });
                }
                switch (transferMethod) {
                    case transfer_method_enum_1.TransferMethod.CHUNK: {
                        await this.chunkImport(impt, transfer);
                        break;
                    }
                    case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                        await this.offsetPaginationImport(impt, transfer);
                        break;
                    }
                    case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                        await this.cursorPaginationImport(impt, transfer);
                        break;
                    }
                    default:
                        throw new Error(`Error while transfer. Unknown transfer method '${transferMethod}'.`);
                }
            }
            catch (error) {
                await this.transferFailureHandler.handle({
                    error,
                    outerTransferFunction: this.import,
                    import: impt,
                    transfer
                });
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
        this.apiConnectionHelper = apiConnectionHelper;
        this.transferFailureHandler = transferFailureHandler;
        this.chunkTransferHelper = chunkTransferHelper;
        this.offsetPaginationTransferHelper = offsetPaginationTransferHelper;
        this.cursorPaginationTransferHelper = cursorPaginationTransferHelper;
        this.transfersRepository = transfersRepository;
    }
    async chunkImport(impt, transfer) {
        const { datasetsPath } = impt;
        const apiConnector = new api_connector_1.default(impt);
        await apiConnector.authRequest();
        const response = await apiConnector.sendRequest();
        let datasets = (0, resolve_path_1.default)(response, datasetsPath);
        const chunkTransferParams = {
            import: impt,
            transfer,
            datasets,
            chunkLength: 100
        };
        await this.chunkTransferHelper.transfer(chunkTransferParams);
    }
    async offsetPaginationImport(impt, transfer) {
        const { paginationOptions, datasetsPath } = impt;
        const { limitValue } = paginationOptions;
        const apiConnector = new api_connector_1.default(impt);
        await apiConnector.authRequest();
        const offsetPaginationTransferParams = {
            import: impt,
            transfer,
            limitPerStep: limitValue,
            paginationFunction: {
                fn: this.offetPaginationFunction,
                params: [apiConnector, datasetsPath]
            }
        };
        await this.offsetPaginationTransferHelper.transfer(offsetPaginationTransferParams);
    }
    async cursorPaginationImport(impt, transfer) {
        const { paginationOptions, datasetsPath } = impt;
        const { limitValue, cursorPath } = paginationOptions;
        const apiConnector = new api_connector_1.default(impt);
        await apiConnector.authRequest();
        const cursorPaginationTransferParams = {
            import: impt,
            transfer,
            limitPerStep: limitValue,
            paginationFunction: {
                fn: this.cursorPaginationFunction,
                params: [apiConnector, cursorPath, datasetsPath]
            }
        };
        await this.cursorPaginationTransferHelper.transfer(cursorPaginationTransferParams);
    }
}
exports.default = ApiImportHelper;
//# sourceMappingURL=api-import.helper.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oauth2_service_1 = __importDefault(require("../modules/oauth2/oauth2.service"));
const sql_columns_helper_1 = __importDefault(require("../modules/sql/helpers/sql-columns.helper"));
const offset_pagination_transfer_helper_1 = __importDefault(require("../modules/transfers/helpers/offset-pagination-transfer.helper"));
const transfer_failure_handler_1 = __importDefault(require("../modules/transfers/helpers/transfer-failure.handler"));
const import_step_helper_1 = __importDefault(require("../modules/transfers/helpers/import-step.helper"));
const chunk_transfer_helper_1 = __importDefault(require("../modules/transfers/helpers/chunk-transfer.helper"));
const cursor_pagination_transfer_helper_1 = __importDefault(require("../modules/transfers/helpers/cursor-pagination-transfer.helper"));
const oauth2_auth_uri_helper_1 = __importDefault(require("../modules/oauth2/helpers/oauth2-auth-uri.helper"));
const api_connection_helper_1 = __importDefault(require("../modules/api/helpers/api-connection.helper"));
const transfers_service_1 = __importDefault(require("../modules/transfers/transfers.service"));
const imports_service_1 = __importDefault(require("../modules/imports/imports.service"));
const connections_service_1 = __importDefault(require("../modules/connections/connections.service"));
const sql_import_helper_1 = __importDefault(require("../modules/sql/helpers/sql-import.helper"));
const api_import_helper_1 = __importDefault(require("../modules/api/helpers/api-import.helper"));
const api_columns_helper_1 = __importDefault(require("../modules/api/helpers/api-columns.helper"));
const sql_import_service_1 = __importDefault(require("../modules/sql/sql-import.service"));
const api_import_service_1 = __importDefault(require("../modules/api/api-import.service"));
const sql_transfer_service_1 = __importDefault(require("../modules/sql/sql-transfer.service"));
const api_transfer_service_1 = __importDefault(require("../modules/api/api-transfer.service"));
const oath2_refresh_token_helper_1 = __importDefault(require("../modules/oauth2/helpers/oath2-refresh-token.helper"));
const pending_transfers_reloader_1 = __importDefault(require("../modules/transfers/helpers/pending-transfers.reloader"));
function initServices(params) {
    const { io, clientUri, oAuth2RedirectUri, datasetsRepository, connectionsRepository, processesRepository, transfersRepository } = params;
    const oAuth2RefreshTokenHelper = new oath2_refresh_token_helper_1.default(connectionsRepository);
    const oAuth2AuthUriHelper = new oauth2_auth_uri_helper_1.default(oAuth2RedirectUri);
    const oAuth2Service = new oauth2_service_1.default(oAuth2RedirectUri, clientUri, connectionsRepository);
    const transferFailureHandler = new transfer_failure_handler_1.default(io, transfersRepository);
    const importStepHelper = new import_step_helper_1.default(io, transfersRepository, datasetsRepository);
    const chunkTransferHelper = new chunk_transfer_helper_1.default(io, importStepHelper, transfersRepository);
    const offsetPaginationTransferHelper = new offset_pagination_transfer_helper_1.default(io, importStepHelper, transfersRepository);
    const cursorPaginationTransferHelper = new cursor_pagination_transfer_helper_1.default(io, importStepHelper, transfersRepository);
    const apiConnectionHelper = new api_connection_helper_1.default(oAuth2RefreshTokenHelper, processesRepository);
    const sqlColumnsHelper = new sql_columns_helper_1.default();
    const apiColumnsHelper = new api_columns_helper_1.default();
    const sqlImportHelper = new sql_import_helper_1.default(transferFailureHandler, offsetPaginationTransferHelper, transfersRepository);
    const apiImportHelper = new api_import_helper_1.default(apiConnectionHelper, transferFailureHandler, chunkTransferHelper, offsetPaginationTransferHelper, cursorPaginationTransferHelper, transfersRepository);
    const sqlImportService = new sql_import_service_1.default(sqlColumnsHelper, sqlImportHelper, transfersRepository);
    const apiImportService = new api_import_service_1.default(apiConnectionHelper, apiColumnsHelper, apiImportHelper, oAuth2AuthUriHelper, processesRepository, transfersRepository);
    const sqlTransferService = new sql_transfer_service_1.default(sqlImportHelper, transfersRepository);
    const apiTransferService = new api_transfer_service_1.default(apiConnectionHelper, apiImportHelper, oAuth2AuthUriHelper, processesRepository, transfersRepository);
    const connectionsService = new connections_service_1.default(connectionsRepository);
    const importsService = new imports_service_1.default(sqlImportService, apiImportService, processesRepository, transfersRepository);
    const transfersService = new transfers_service_1.default(sqlTransferService, apiTransferService, transfersRepository, processesRepository);
    const pendingTransfersReloader = new pending_transfers_reloader_1.default(sqlImportHelper, apiImportHelper, transfersRepository);
    return {
        connectionsService,
        importsService,
        transfersService,
        oAuth2Service,
        pendingTransfersReloader
    };
}
exports.default = initServices;
//# sourceMappingURL=services.init.js.map
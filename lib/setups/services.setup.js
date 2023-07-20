"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_processes_service_1 = __importDefault(require("../modules/import-processes/import-processes.service"));
const imports_service_1 = __importDefault(require("../modules/imports/imports.service"));
const oauth2_service_1 = __importDefault(require("../modules/oauth2/oauth2.service"));
const oauth2_auth_uri_helper_1 = __importDefault(require("../modules/oauth2/oauth2-auth-uri.helper"));
const oath2_refresh_token_helper_1 = __importDefault(require("../modules/oauth2/oath2-refresh-token.helper"));
const sql_transfer_helper_1 = __importDefault(require("../modules/sql/sql-transfer.helper"));
const chunk_transfer_helper_1 = __importDefault(require("../modules/transfer/chunk-transfer.helper"));
const transfer_step_helper_1 = __importDefault(require("../modules/transfer/transfer-step.helper"));
const offset_pagination_transfer_helper_1 = __importDefault(require("../modules/transfer/offset-pagination-transfer.helper"));
const cursor_pagination_transfer_helper_1 = __importDefault(require("../modules/transfer/cursor-pagination-transfer.helper"));
const api_transfer_helper_1 = __importDefault(require("../modules/api/api-transfer.helper"));
const api_connection_helper_1 = __importDefault(require("../modules/api/api-connection.helper"));
const sql_columns_helper_1 = __importDefault(require("../modules/sql/sql-columns.helper"));
const api_columns_helper_1 = __importDefault(require("../modules/api/api-columns.helper"));
const api_import_service_1 = __importDefault(require("../modules/api/api-import.service"));
const sql_import_service_1 = __importDefault(require("../modules/sql/sql-import.service"));
const import_transfer_failure_handler_1 = __importDefault(require("../modules/transfer/import-transfer-failure.handler"));
function setupServices(io, datasetsRepository, importsRepository, importProcessesRepository, maxAttempts, attemptDelayTime, oAuth2RedirectUri, clientUri) {
    const transferStepHelper = new transfer_step_helper_1.default(io, datasetsRepository, importProcessesRepository);
    const chunkTransferHelper = new chunk_transfer_helper_1.default(io, transferStepHelper, importProcessesRepository);
    const offsetPaginationTransferHelper = new offset_pagination_transfer_helper_1.default(io, transferStepHelper, importProcessesRepository);
    const cursorPaginationTransferHelper = new cursor_pagination_transfer_helper_1.default(io, transferStepHelper, importProcessesRepository);
    const importTransferFailureHandler = new import_transfer_failure_handler_1.default(io, importProcessesRepository, maxAttempts, attemptDelayTime);
    const sqlTransferHelper = new sql_transfer_helper_1.default(importProcessesRepository, importTransferFailureHandler, offsetPaginationTransferHelper);
    const apiTransferHelper = new api_transfer_helper_1.default(importProcessesRepository, importTransferFailureHandler, chunkTransferHelper, offsetPaginationTransferHelper, cursorPaginationTransferHelper);
    const oAuth2AuthUriHelper = new oauth2_auth_uri_helper_1.default(oAuth2RedirectUri);
    const oAuth2RefreshTokenHelper = new oath2_refresh_token_helper_1.default(importsRepository);
    const oAuth2Service = new oauth2_service_1.default(importsRepository, oAuth2RedirectUri, clientUri);
    const apiConnectionHelper = new api_connection_helper_1.default(importsRepository, oAuth2RefreshTokenHelper);
    const sqlColumnsHelper = new sql_columns_helper_1.default();
    const apiColumnsHelper = new api_columns_helper_1.default();
    const sqlImportService = new sql_import_service_1.default(sqlColumnsHelper, sqlTransferHelper, importProcessesRepository);
    const apiImportService = new api_import_service_1.default(apiConnectionHelper, apiColumnsHelper, apiTransferHelper, oAuth2AuthUriHelper, importProcessesRepository, importsRepository);
    const importsService = new imports_service_1.default(importsRepository, importProcessesRepository, sqlImportService, apiImportService);
    const importProcessesService = new import_processes_service_1.default(importProcessesRepository, importsRepository, sqlImportService, apiImportService);
    return {
        importsService,
        importProcessesService,
        oAuth2Service,
        sqlTransferHelper,
        apiTransferHelper
    };
}
exports.default = setupServices;
//# sourceMappingURL=services.setup.js.map
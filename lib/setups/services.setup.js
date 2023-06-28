"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const columns_service_1 = __importDefault(require("../modules/columns/columns.service"));
const import_processes_service_1 = __importDefault(require("../modules/import-processes/import-processes.service"));
const imports_service_1 = __importDefault(require("../modules/imports/imports.service"));
const transfer_helper_1 = __importDefault(require("../modules/transfer/transfer.helper"));
const transfer_service_1 = __importDefault(require("../modules/transfer/transfer.service"));
const sql_columns_service_1 = __importDefault(require("../modules/columns/columns/sql-columns.service"));
const transfer_sql_service_1 = __importDefault(require("../modules/transfer/transfers/transfer-sql.service"));
function setupServices(io, datasetsRepository, importsRepository, importProcessesRepository, maxAttempts, delayAttempt, limit) {
    const sqlColumnsService = new sql_columns_service_1.default();
    const columnsService = new columns_service_1.default(sqlColumnsService);
    const transferHelper = new transfer_helper_1.default(io, datasetsRepository, importProcessesRepository);
    const transferSQLService = new transfer_sql_service_1.default(importProcessesRepository, transferHelper);
    const transferService = new transfer_service_1.default(io, importProcessesRepository, transferSQLService, maxAttempts, delayAttempt, limit);
    const importsService = new imports_service_1.default(importsRepository, importProcessesRepository, columnsService, transferService);
    const importProcessesService = new import_processes_service_1.default(importProcessesRepository, importsRepository, transferService);
    return {
        importsService,
        importProcessesService,
        transferService
    };
}
exports.default = setupServices;
//# sourceMappingURL=services.setup.js.map
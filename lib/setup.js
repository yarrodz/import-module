"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_setup_1 = __importDefault(require("./setups/repositories.setup"));
const services_setup_1 = __importDefault(require("./setups/services.setup"));
const controllers_setup_1 = __importDefault(require("./setups/controllers.setup"));
const routers_setup_1 = __importDefault(require("./setups/routers.setup"));
const pending_import_processes_reloader_1 = __importDefault(require("./modules/import-processes/pending-import-processes.reloader"));
module.exports = function setupImport(params) {
    const { io, recordModel, datasetModel, maxAttempts, attemptDelayTime, oAuth2RedirectUri, clientUri } = params;
    const { datasetsRepository, importsRepository, importProcessesRepository } = (0, repositories_setup_1.default)(recordModel, datasetModel);
    const { importsService, importProcessesService, oAuth2Service, sqlTransferHelper, apiTransferHelper } = (0, services_setup_1.default)(io, datasetsRepository, importsRepository, importProcessesRepository, maxAttempts, attemptDelayTime, oAuth2RedirectUri, clientUri);
    const reloadPendingImportProcesses = (0, pending_import_processes_reloader_1.default)(importProcessesRepository, importsRepository, sqlTransferHelper, apiTransferHelper);
    const { importsController, importProcessesController, oAuthController } = (0, controllers_setup_1.default)(importsService, importProcessesService, oAuth2Service);
    const { importsRouter, importProcessesRouter, oAuth2Router } = (0, routers_setup_1.default)(importsController, importProcessesController, oAuthController);
    return {
        importsRouter,
        importProcessesRouter,
        oAuth2Router,
        reloadPendingImportProcesses
    };
};
//# sourceMappingURL=setup.js.map
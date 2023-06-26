"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_setup_1 = __importDefault(require("./setups/repositories.setup"));
const services_setup_1 = __importDefault(require("./setups/services.setup"));
const controllers_setup_1 = __importDefault(require("./setups/controllers.setup"));
const routers_setup_1 = __importDefault(require("./setups/routers.setup"));
module.exports = function setupImport(io, recordModel, datasetModel, maxAttempts, attemptDelayTime, limit) {
    const { datasetsRepository, importsRepository, importProcessesRepository } = (0, repositories_setup_1.default)(recordModel, datasetModel);
    const { importsService, importProcessesService } = (0, services_setup_1.default)(io, datasetsRepository, importsRepository, importProcessesRepository, maxAttempts, attemptDelayTime, limit);
    const { importsController, importProcessesController } = (0, controllers_setup_1.default)(importsService, importProcessesService);
    const { importsRouter, importProcessesRouter } = (0, routers_setup_1.default)(importsController, importProcessesController);
    return { importsRouter, importProcessesRouter };
};
//# sourceMappingURL=setup.js.map
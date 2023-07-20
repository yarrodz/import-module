"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_processes_controller_1 = __importDefault(require("../modules/import-processes/import-processes.controller"));
const imports_controller_1 = __importDefault(require("../modules/imports/imports.controller"));
const oauth2_controller_1 = __importDefault(require("../modules/oauth2/oauth2.controller"));
function setupControllers(importsService, importProcessesService, oAuth2Service) {
    const importsController = new imports_controller_1.default(importsService);
    const importProcessesController = new import_processes_controller_1.default(importProcessesService);
    const oAuthController = new oauth2_controller_1.default(oAuth2Service);
    return {
        importsController,
        importProcessesController,
        oAuthController
    };
}
exports.default = setupControllers;
//# sourceMappingURL=controllers.setup.js.map
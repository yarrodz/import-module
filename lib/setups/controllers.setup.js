"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_processes_controller_1 = __importDefault(require("../modules/import-processes/import-processes.controller"));
const imports_controller_1 = __importDefault(require("../modules/imports/imports.controller"));
function setupControllers(importsService, importProcessesService) {
    const importsController = new imports_controller_1.default(importsService);
    const importProcessesController = new import_processes_controller_1.default(importProcessesService);
    return {
        importsController,
        importProcessesController
    };
}
exports.default = setupControllers;
//# sourceMappingURL=controllers.setup.js.map
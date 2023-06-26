"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_processes_router_1 = __importDefault(require("../modules/import-processes/import-processes.router"));
const imports_router_1 = __importDefault(require("../modules/imports/imports.router"));
function setupRouters(importsController, importProcessesController) {
    const importsRouter = new imports_router_1.default(importsController);
    const importProcessesRouter = new import_processes_router_1.default(importProcessesController);
    return {
        importsRouter,
        importProcessesRouter
    };
}
exports.default = setupRouters;
//# sourceMappingURL=routers.setup.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_processes_router_1 = __importDefault(require("../modules/import-processes/import-processes.router"));
const imports_router_1 = __importDefault(require("../modules/imports/imports.router"));
const oauth2_router_1 = __importDefault(require("../modules/oauth2/oauth2.router"));
function setupRouters(importsController, importProcessesController, oAuth2Controller) {
    const importsRouter = new imports_router_1.default(importsController);
    const importProcessesRouter = new import_processes_router_1.default(importProcessesController);
    const oAuth2Router = new oauth2_router_1.default(oAuth2Controller);
    return {
        importsRouter,
        importProcessesRouter,
        oAuth2Router
    };
}
exports.default = setupRouters;
//# sourceMappingURL=routers.setup.js.map
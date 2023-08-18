"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connections_router_1 = __importDefault(require("../modules/connections/connections.router"));
const imports_router_1 = __importDefault(require("../modules/imports/imports.router"));
const oauth2_router_1 = __importDefault(require("../modules/oauth2/oauth2.router"));
const transfers_router_1 = __importDefault(require("../modules/transfers/transfers.router"));
function initRouters(params) {
    const { connectionsController, importsController, transfersController, oAuth2Controller } = params;
    const connectionsRouter = new connections_router_1.default(connectionsController);
    const importsRouter = new imports_router_1.default(importsController);
    const transfersRouter = new transfers_router_1.default(transfersController);
    const oAuth2Router = new oauth2_router_1.default(oAuth2Controller);
    return {
        connectionsRouter,
        importsRouter,
        transfersRouter,
        oAuth2Router
    };
}
exports.default = initRouters;
//# sourceMappingURL=routers.init.js.map
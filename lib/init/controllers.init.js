"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oauth2_controller_1 = __importDefault(require("../modules/oauth2/oauth2.controller"));
const transfers_controller_1 = __importDefault(require("../modules/transfers/transfers.controller"));
const imports_controller_1 = __importDefault(require("../modules/imports/imports.controller"));
const connections_controller_1 = __importDefault(require("../modules/connections/connections.controller"));
function initControllers(params) {
    const { connectionsService, importsService, transfersService, oAuth2Service } = params;
    const connectionsController = new connections_controller_1.default(connectionsService);
    const importsController = new imports_controller_1.default(importsService);
    const transfersController = new transfers_controller_1.default(transfersService);
    const oAuth2Controller = new oauth2_controller_1.default(oAuth2Service);
    return {
        connectionsController,
        importsController,
        transfersController,
        oAuth2Controller
    };
}
exports.default = initControllers;
//# sourceMappingURL=controllers.init.js.map
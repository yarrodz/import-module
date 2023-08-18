"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_init_1 = __importDefault(require("./init/repositories.init"));
const services_init_1 = __importDefault(require("./init/services.init"));
const controllers_init_1 = __importDefault(require("./init/controllers.init"));
const routers_init_1 = __importDefault(require("./init/routers.init"));
module.exports = function initImports(params) {
    const { io, dbClient, clientUri, oAuth2RedirectUri } = params;
    const initRepositoriesResult = (0, repositories_init_1.default)(dbClient);
    const initServicesResult = (0, services_init_1.default)({
        io,
        clientUri,
        oAuth2RedirectUri,
        ...initRepositoriesResult
    });
    const { pendingTransfersReloader } = initServicesResult;
    const initControllersResult = (0, controllers_init_1.default)(initServicesResult);
    const InitRoutersResult = (0, routers_init_1.default)(initControllersResult);
    return {
        ...InitRoutersResult,
        pendingTransfersReloader
    };
};
//# sourceMappingURL=init.js.map
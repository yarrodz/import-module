"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connections_repository_1 = __importDefault(require("../modules/connections/connections.repository"));
const datasets_repository_1 = __importDefault(require("../modules/datasets/datasets.repository"));
const process_repository_1 = __importDefault(require("../modules/processes/process.repository"));
const transfers_repository_1 = __importDefault(require("../modules/transfers/transfers.repository"));
function initRepositories(dbClient) {
    const datasetsRepository = new datasets_repository_1.default(dbClient);
    const connectionsRepository = new connections_repository_1.default(dbClient);
    const processesRepository = new process_repository_1.default(dbClient);
    const transfersRepository = new transfers_repository_1.default(dbClient);
    return {
        datasetsRepository,
        connectionsRepository,
        processesRepository,
        transfersRepository
    };
}
exports.default = initRepositories;
//# sourceMappingURL=repositories.init.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasets_repository_1 = __importDefault(require("../modules/datasets/datasets.repository"));
const imports_repository_1 = __importDefault(require("../modules/imports/imports.repository"));
const import_processes_repository_1 = __importDefault(require("../modules/import-processes/import-processes.repository"));
const records_repository_1 = __importDefault(require("../modules/records/records.repository"));
const import_schema_1 = __importDefault(require("../modules/imports/import.schema"));
const import_process_schema_1 = __importDefault(require("../modules/import-processes/import-process.schema"));
function setupRepositories(recordModel, datasetModel) {
    const recordsRepository = new records_repository_1.default(recordModel);
    const datasetsRepository = new datasets_repository_1.default(datasetModel, recordsRepository);
    const importsRepository = new imports_repository_1.default(import_schema_1.default);
    const importProcessesRepository = new import_processes_repository_1.default(import_process_schema_1.default);
    return {
        datasetsRepository,
        importsRepository,
        importProcessesRepository
    };
}
exports.default = setupRepositories;
//# sourceMappingURL=repositories.setup.js.map
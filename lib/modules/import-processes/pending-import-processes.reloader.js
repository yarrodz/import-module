"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_source_enum_1 = require("../imports/enums/import-source.enum");
function createPendingImportProcessesReloaderFunction(importProcessesRepository, importsRepository, sqlTransferHelper, apiTransferHelper) {
    const reloadPendingImportProcesses = async function () {
        const pendingProcesses = await importProcessesRepository.findPending();
        await Promise.all(pendingProcesses.map(async (process) => {
            const { import: importId } = process;
            const impt = await importsRepository.findById(importId);
            const { source } = impt;
            switch (source) {
                case import_source_enum_1.ImportSource.SQL: {
                    await sqlTransferHelper.transfer(impt, process);
                    break;
                }
                case import_source_enum_1.ImportSource.API: {
                    await apiTransferHelper.transfer(impt, process);
                    break;
                }
            }
        }));
    };
    return reloadPendingImportProcesses;
}
exports.default = createPendingImportProcessesReloaderFunction;
//# sourceMappingURL=pending-import-processes.reloader.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createReloadPendingImportProcessesFunction(importProcessesRepository, importsRepository, transferService) {
    const reloadPendingImportProcesses = async function () {
        const pendingProcesses = await importProcessesRepository.findPending();
        await Promise.all(pendingProcesses.map(async (process) => {
            const impt = await importsRepository.findById(process.import.toString());
            if (!impt) {
                return;
            }
            await transferService.transfer(impt, process);
        }));
    };
    return reloadPendingImportProcesses;
}
exports.default = createReloadPendingImportProcessesFunction;
//# sourceMappingURL=reload-pending-processes.js.map
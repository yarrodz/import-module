"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
class ChunkTransferHelper {
    constructor(io, transferStepHelper, importProcessesRepository) {
        this.io = io;
        this.transferStepHelper = transferStepHelper;
        this.importProcessesRepository = importProcessesRepository;
    }
    async chunkTransfer(impt, processId, chunkedDatasets) {
        while (chunkedDatasets.length) {
            const refreshedProcess = await this.importProcessesRepository.findById(processId);
            if (refreshedProcess.status === import_status_enum_1.ImportStatus.PAUSED) {
                this.io
                    .to(processId.toString())
                    .emit('importProcess', refreshedProcess);
                return;
            }
            const chunk = chunkedDatasets.shift();
            await this.transferStepHelper.transferStep(impt, processId, chunk);
        }
        const completedProcess = await this.importProcessesRepository.update(processId, {
            status: import_status_enum_1.ImportStatus.COMPLETED,
            errorMessage: null
        });
        this.io.to(processId.toString()).emit('importProcess', completedProcess);
    }
}
exports.default = ChunkTransferHelper;
// public async streamTransfer(
//   impt: IImportDocument,
//   processId: string,
//   idColumn: string,
//   readable: ReadStream
// ) {
//   for await (const chunk of readable) {
//     const refreshedProcess = await this.importProcessesRepository.findById(
//       processId
//     );
//     if (refreshedProcess.status === ImportStatus.PAUSED) {
//       this.io
//         .to(processId.toString())
//         .emit('importProcess', refreshedProcess);
//       return;
//     }
//     let chunks = chunk.toString().split('][');
//     let parsedChunks = chunks.map((chunk) => JSON.parse(chunks));
//     const parsedChunk = parsedChunks[0];
//     const transormedDatasets = await this.transformDatasets(
//       impt,
//       processId,
//       parsedChunk,
//       idColumn
//     );
//     await this.insertDatasets(transormedDatasets);
//     const updatedProcess = await this.importProcessesRepository.update(
//       processId,
//       {
//         attempts: 0,
//         errorMessage: null,
//         $inc: {
//           processedDatasetsCount: parsedChunk.length,
//           transferedDatasetsCount: transormedDatasets.length
//         }
//       }
//     );
//     this.io.to(processId.toString()).emit('importProcess', updatedProcess);
//   }
//   const completedProcess = await this.importProcessesRepository.update(
//     processId,
//     {
//       status: ImportStatus.COMPLETED,
//       errorMessage: null
//     }
//   );
//   this.io.to(processId.toString()).emit('importProcess', completedProcess);
// }
//# sourceMappingURL=chunk-transfer.helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_status_enum_1 = require("../enums/transfer-status.enum");
class ChunkTransferHelper {
    constructor(io, importStepHelper, transfersRepository) {
        this.io = io;
        this.importStepHelper = importStepHelper;
        this.transfersRepository = transfersRepository;
    }
    async transfer(params) {
        let { import: impt, transfer, datasets, chunkLength } = params;
        const { id: transferId, offset } = transfer;
        let slicedDatasets = datasets.slice(offset, datasets.length);
        datasets = null;
        const chunkedDatasets = this.chunkObjectArray(slicedDatasets, chunkLength);
        slicedDatasets = null;
        while (chunkedDatasets.length) {
            const refreshedTransfer = await this.transfersRepository.load(transferId);
            if (refreshedTransfer.status === transfer_status_enum_1.TransferStatus.PAUSED) {
                this.io.to(String(transferId)).emit('transfer', {
                    ...refreshedTransfer,
                    log: refreshedTransfer.log[0] || []
                });
                return;
            }
            const datasetsChunk = chunkedDatasets.shift();
            await this.importStepHelper.step(impt, refreshedTransfer, datasetsChunk);
        }
        const completedTransfer = await this.transfersRepository.update({
            id: transferId,
            status: transfer_status_enum_1.TransferStatus.COMPLETED
        });
        this.io.to(String(transferId)).emit('transfer', {
            ...completedTransfer,
            log: completedTransfer.log[0] || []
        });
    }
    // chunkObjectArray([1,2,3,4,5,6,7,8,9], 3) => [[1,2,3],[4,5,6],[7,8,9]]
    chunkObjectArray(array, chunkLength) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkLength) {
            const chunk = array.slice(i, i + chunkLength);
            chunkedArray.push(chunk);
        }
        return chunkedArray;
    }
}
exports.default = ChunkTransferHelper;
//# sourceMappingURL=chunk-transfer.helper.js.map
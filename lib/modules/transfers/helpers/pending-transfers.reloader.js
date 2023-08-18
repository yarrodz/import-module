"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_enum_1 = require("../../imports/enums/source.enum");
const transfer_status_enum_1 = require("../enums/transfer-status.enum");
class PendingTransfersReloader {
    constructor(sqlImportHelper, apiImportHelper, transfersRepository) {
        this.sqlImportHelper = sqlImportHelper;
        this.apiImportHelper = apiImportHelper;
        this.transfersRepository = transfersRepository;
    }
    async reload() {
        const pendingTransfers = await this.transfersRepository.query({
            type: 'equals',
            property: 'status',
            value: transfer_status_enum_1.TransferStatus.PENDING
        }, {}, false);
        await Promise.all(pendingTransfers.map(async (transfer) => {
            try {
                const impt = transfer.__.inImport;
                const { source } = impt;
                switch (source) {
                    case source_enum_1.Source.SQL: {
                        await this.sqlImportHelper.import({
                            import: impt,
                            transfer
                        });
                        break;
                    }
                    case source_enum_1.Source.API: {
                        await this.apiImportHelper.import({
                            import: impt,
                            transfer
                        });
                        break;
                    }
                    default: {
                        console.error(`Error while reloading pending transfers: Unknown import source: '${source}'.`);
                    }
                }
            }
            catch (error) {
                console.error(`Error while reloading pending transfers: ${error}.`);
            }
        }));
    }
}
exports.default = PendingTransfersReloader;
//# sourceMappingURL=pending-transfers.reloader.js.map
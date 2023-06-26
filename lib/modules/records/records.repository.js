"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecordsRepository {
    constructor(recordModel) {
        this.recordModel = recordModel;
    }
    async createMany(records, datasetId) {
        try {
            const recordsToCreate = records.map((record) => {
                return {
                    ...record,
                    dataset: datasetId
                };
            });
            return await this.recordModel.insertMany(recordsToCreate);
        }
        catch (error) {
            throw new Error(`Error while inserting records: ${error.message}`);
        }
    }
    async archiveRecords(datasetId) {
        try {
            await this.recordModel.updateMany({ dataset: datasetId }, { archived: true });
        }
        catch (error) {
            throw new Error(`Error while archiving records: ${error.message}`);
        }
    }
}
exports.default = RecordsRepository;
//# sourceMappingURL=records.repository.js.map
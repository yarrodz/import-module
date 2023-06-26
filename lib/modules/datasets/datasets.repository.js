"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatasetsRepository {
    constructor(datasetModel, recordsRepository) {
        this.datasetModel = datasetModel;
        this.recordsRepository = recordsRepository;
    }
    async create(dataset) {
        try {
            const createdDataset = await this.datasetModel.create({
                ...dataset,
                records: []
            });
            const createdRecords = await this.recordsRepository.createMany(dataset.records, createdDataset._id);
            await createdDataset.updateOne({ records: createdRecords });
        }
        catch (error) {
            throw new Error(`Error while creating the dataset: ${error.message}`);
        }
    }
    async update(id, dataset) {
        try {
            await this.recordsRepository.archiveRecords(id);
            const createdRecords = await this.recordsRepository.createMany(dataset.records, id);
            await this.datasetModel.findByIdAndUpdate(id, {
                records: createdRecords
            });
        }
        catch (error) {
            throw new Error(`Error while updating the dataset: ${error.message}`);
        }
    }
    async findByImportAndSourceDatasetIds(importId, sourceDatasetId) {
        try {
            return await this.datasetModel.findOne({
                import: importId,
                sourceDatasetId
            });
        }
        catch (error) {
            throw new Error(`Error while searching the dataset: ${error.message}`);
        }
    }
}
exports.default = DatasetsRepository;
//# sourceMappingURL=datasets.repository.js.map
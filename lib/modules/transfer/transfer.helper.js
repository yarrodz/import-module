"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feature_type_enum_1 = require("../features/enums/feature-type.enum");
const import_status_enum_1 = require("../import-processes/enums/import-status.enum");
class TransferHelper {
    constructor(io, datasetsRepository, importProcessesRepository) {
        this.io = io;
        this.datasetsRepository = datasetsRepository;
        this.importProcessesRepository = importProcessesRepository;
    }
    async paginationTransfer(impt, processId, idColumn, datasetsCount, offset, limit, paginationFunction, ...paginationFunctionParams) {
        while (offset < datasetsCount) {
            const refreshedProcess = await this.importProcessesRepository.findById(processId);
            if (refreshedProcess.status === import_status_enum_1.ImportStatus.PAUSED) {
                this.io
                    .to(processId.toString())
                    .emit('importProcess', refreshedProcess);
                return;
            }
            const retrievedDatasets = await paginationFunction(offset, limit, ...paginationFunctionParams);
            const transormedDatasets = await this.transformDatasets(impt, processId, retrievedDatasets, idColumn);
            await this.insertDatasets(transormedDatasets);
            const updatedProcess = await this.importProcessesRepository.update(processId, {
                attempts: 0,
                errorMessage: null,
                $inc: {
                    processedDatasetsCount: retrievedDatasets.length,
                    transferedDatasetsCount: transormedDatasets.length
                }
            });
            this.io.to(processId.toString()).emit('importProcess', updatedProcess);
            offset += limit;
        }
        const completedProcess = await this.importProcessesRepository.update(processId, {
            status: import_status_enum_1.ImportStatus.COMPLETED,
            errorMessage: null
        });
        this.io.to(processId.toString()).emit('importProcess', completedProcess);
    }
    async chunkTransfer(chunkedDatasets, impt, processId, idColumn) {
        while (chunkedDatasets.length) {
            const refreshedProcess = await this.importProcessesRepository.findById(processId);
            if (refreshedProcess.status === import_status_enum_1.ImportStatus.PAUSED) {
                this.io
                    .to(processId.toString())
                    .emit('importProcess', refreshedProcess);
                return;
            }
            const chunk = chunkedDatasets.shift();
            const transormedDatasets = await this.transformDatasets(impt, processId, chunk, idColumn);
            await this.insertDatasets(transormedDatasets);
            const updatedProcess = await this.importProcessesRepository.update(processId, {
                attempts: 0,
                errorMessage: null,
                $inc: {
                    processedDatasetsCount: chunk.length,
                    transferedDatasetsCount: transormedDatasets.length
                }
            });
            this.io.to(processId.toString()).emit('importProcess', updatedProcess);
        }
        const completedProcess = await this.importProcessesRepository.update(processId, {
            status: import_status_enum_1.ImportStatus.COMPLETED,
            errorMessage: null
        });
        this.io.to(processId.toString()).emit('importProcess', completedProcess);
    }
    async transformDatasets(impt, processId, retrievedDatasets, idColumn) {
        const importId = impt._id;
        const unitId = impt.unit;
        const fields = impt.fields;
        const datasets = [];
        retrievedDatasets.forEach(async (retrievedDataset) => {
            try {
                const sourceDatasetId = retrievedDataset[idColumn];
                if (sourceDatasetId === null) {
                    throw new Error('The id field contains a null value');
                }
                const records = this.transformRecords(fields, retrievedDataset);
                const dataset = {
                    unit: unitId,
                    import: importId,
                    sourceDatasetId: sourceDatasetId,
                    records
                };
                datasets.push(dataset);
            }
            catch (error) {
                await this.importProcessesRepository.update(processId, {
                    $push: {
                        log: `Cannot parse dataset: '${JSON.stringify(retrievedDataset)}', Error: '${error.message}'`
                    }
                });
            }
        });
        return datasets;
    }
    transformRecords(fields, sourceDataset) {
        const records = [];
        fields.forEach(({ feature, source }) => {
            const featureId = feature._id;
            const value = sourceDataset[source];
            const parsedValue = this.parseValue(feature, value);
            const record = {
                value: parsedValue,
                feature: featureId
            };
            records.push(record);
        });
        return records;
    }
    parseValue(feature, value) {
        try {
            switch (feature.type) {
                case feature_type_enum_1.FeatureType.TIME:
                case feature_type_enum_1.FeatureType.TEXT:
                case feature_type_enum_1.FeatureType.LONG_TEXT:
                    return String(value);
                case feature_type_enum_1.FeatureType.DATE:
                case feature_type_enum_1.FeatureType.DATETIME:
                    return new Date(value);
                case feature_type_enum_1.FeatureType.BOOLEAN:
                    return Boolean(value);
                case feature_type_enum_1.FeatureType.NUMBER:
                    return Number(value);
                default:
                    break;
            }
        }
        catch (error) {
            throw new Error(`Error while parsing record value: ${error.message}`);
        }
    }
    async insertDatasets(datasets) {
        try {
            await Promise.all(datasets.map(async (dataset) => {
                const existingDataset = await this.datasetsRepository.findByImportAndSourceDatasetIds(dataset.import, dataset.sourceDatasetId);
                if (!existingDataset) {
                    await this.datasetsRepository.create(dataset);
                }
                else {
                    await this.datasetsRepository.update(existingDataset._id, dataset);
                }
            }));
        }
        catch (error) {
            throw new Error(`Error while transfer datasets: ${error.message}`);
        }
    }
}
exports.default = TransferHelper;
//# sourceMappingURL=transfer.helper.js.map
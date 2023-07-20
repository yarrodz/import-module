"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feature_type_enum_1 = require("../features/enums/feature-type.enum");
const resolve_path_1 = __importDefault(require("../../utils/resolve-path/resolve-path"));
class TransferStepHelper {
    constructor(io, datasetsRepository, importProcessesRepository) {
        this.io = io;
        this.datasetsRepository = datasetsRepository;
        this.importProcessesRepository = importProcessesRepository;
    }
    async transferStep(impt, processId, datasets, cursor) {
        const transormedDatasets = await this.transformDatasets(impt, processId, datasets);
        await this.insertDatasets(transormedDatasets);
        const updatedProcess = await this.importProcessesRepository.update(processId, {
            attempts: 0,
            errorMessage: null,
            cursor,
            $inc: {
                processedDatasetsCount: datasets.length,
                transferedDatasetsCount: transormedDatasets.length
            }
        });
        this.io.to(processId.toString()).emit('importProcess', updatedProcess);
    }
    async transformDatasets(impt, processId, datasets) {
        const { _id: importId, unit: unitId, fields, idColumn } = impt;
        const transformedDatasets = [];
        datasets.forEach(async (dataset) => {
            try {
                const sourceDatasetId = dataset[idColumn];
                if (sourceDatasetId === null) {
                    throw new Error('The id field contains a null value');
                }
                const records = this.transformRecords(fields, dataset);
                const transformedDataset = {
                    unit: unitId,
                    import: importId,
                    sourceDatasetId: sourceDatasetId,
                    records
                };
                transformedDatasets.push(transformedDataset);
            }
            catch (error) {
                await this.importProcessesRepository.update(processId, {
                    $push: {
                        log: `Cannot parse dataset: '${JSON.stringify(dataset)}', Error: '${error.message}'`
                    }
                });
            }
        });
        return transformedDatasets;
    }
    transformRecords(fields, dataset) {
        const records = [];
        fields.forEach(({ feature, source }) => {
            const { _id: featureId } = feature;
            const value = (0, resolve_path_1.default)(dataset, source);
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
            throw new Error(`Error while insert datasets: ${error.message}.`);
        }
    }
}
exports.default = TransferStepHelper;
//# sourceMappingURL=transfer-step.helper.js.map
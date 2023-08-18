"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_path_1 = __importDefault(require("../../../utils/resolve-path/resolve-path"));
const feature_type_enum_1 = require("../../features/feature-type.enum");
class ImportStepHelper {
    constructor(io, transfersRepository, datasetsRepository) {
        this.io = io;
        this.transfersRepository = transfersRepository;
        this.datasetsRepository = datasetsRepository;
    }
    async step(impt, transfer, datasets, cursor) {
        const { id: transferId } = transfer;
        const transormedDatasets = await this.transformDatasets(impt, transfer, datasets);
        await this.insertDatasets(transormedDatasets);
        const updatedTransfer = await this.transfersRepository.update({
            id: transferId,
            cursor,
            offset: transfer.offset + datasets.length,
            transferedDatasetsCount: transfer.transferedDatasetsCount + transormedDatasets.length,
            retryAttempts: 0
        });
        this.io.to(String(transferId)).emit('transfer', {
            ...updatedTransfer,
            log: updatedTransfer.log[0] || []
        });
    }
    async transformDatasets(impt, transfer, datasets) {
        const { id: importId, idKey } = impt;
        let { id: transferId, log } = transfer;
        const { fields } = impt;
        const unit = impt.__.inUnit;
        const { id: unitId } = unit;
        const transformedDatasets = [];
        datasets.forEach(async (dataset) => {
            try {
                const sourceId = (0, resolve_path_1.default)(dataset, idKey);
                if (sourceId === null) {
                    throw new Error('The id field contains a null value');
                }
                const records = this.transformRecords(dataset, fields);
                const transformedDataset = {
                    unitId,
                    importId,
                    sourceId,
                    records
                };
                transformedDatasets.push(transformedDataset);
            }
            catch (error) {
                log.unshift(`Cannot parse dataset: '${JSON.stringify(dataset)}', Error: '${error.message}'`);
                await this.transfersRepository.update({
                    id: transferId,
                    log
                });
            }
        });
        return transformedDatasets;
    }
    transformRecords(dataset, fields) {
        const records = [];
        fields.forEach(({ feature, source }) => {
            const { id: featureId } = feature;
            const value = (0, resolve_path_1.default)(dataset, source);
            const parsedValue = this.parseValue(value, feature);
            const record = {
                value: parsedValue,
                featureId
            };
            records.push(record);
        });
        return records;
    }
    parseValue(value, feature) {
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
            await this.datasetsRepository.bulkSave(datasets);
        }
        catch (error) {
            throw new Error(`Error while insert datasets: ${error.message}.`);
        }
    }
}
exports.default = ImportStepHelper;
//# sourceMappingURL=import-step.helper.js.map
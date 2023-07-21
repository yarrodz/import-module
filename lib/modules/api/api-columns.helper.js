"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_connector_1 = __importDefault(require("./connector/api-connector"));
const transfer_type_enum_1 = require("../transfer/enums/transfer-type.enum");
const resolve_path_1 = __importDefault(require("../../utils/resolve-path/resolve-path"));
class ApiColumnsHelper {
    async find(impt) {
        try {
            const { api } = impt;
            const { transferType, datasetsPath } = api;
            const apiConnector = new api_connector_1.default(api);
            await apiConnector.authorizeRequest();
            let response;
            switch (transferType) {
                case transfer_type_enum_1.TransferType.CHUNK: {
                    response = await apiConnector.sendRequest();
                    break;
                }
                case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                    const pagination = {
                        offset: 0,
                        limit: 1
                    };
                    apiConnector.paginateRequest(pagination);
                    response = await apiConnector.sendRequest();
                    break;
                }
                case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                    const pagination = {
                        limit: 1
                    };
                    apiConnector.paginateRequest(pagination);
                    response = await apiConnector.sendRequest();
                    break;
                }
                default: {
                    throw new Error(`Error wlile searching for columns. Unknown transfer type: '${transferType}'.`);
                }
            }
            const datasets = (0, resolve_path_1.default)(response, datasetsPath);
            // console.log("datasets: ", datasets);
            const dataset = datasets[0];
            // console.log('dateset: ', dataset)
            const columns = this.findNestedObjectTypes(dataset);
            return columns;
        }
        catch (error) {
            throw new Error(`Error while searching columns for API: ${error.message}`);
        }
    }
    async checkIdColumnUniqueness(impt) {
        try {
            const { api, idColumn } = impt;
            const { transferType, datasetsPath } = api;
            const apiConnector = new api_connector_1.default(api);
            await apiConnector.authorizeRequest();
            switch (transferType) {
                case transfer_type_enum_1.TransferType.CHUNK: {
                    const response = await apiConnector.sendRequest();
                    const datasets = (0, resolve_path_1.default)(response, datasetsPath);
                    return this.checkKeyValuesUniqueness(datasets, idColumn);
                }
                case transfer_type_enum_1.TransferType.OFFSET_PAGINATION: {
                    return true;
                }
                case transfer_type_enum_1.TransferType.CURSOR_PAGINATION: {
                    return true;
                }
                default: {
                    throw new Error('Unknown transfer type.');
                }
            }
        }
        catch (error) {
            throw new Error(`Error while checking column uniqueness: ${error.message}`);
        }
    }
    findNestedObjectTypes(obj) {
        if (typeof obj === 'object' && obj !== null) {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                const type = typeof value;
                const column = {
                    name: key,
                    type: type === 'object' && value !== null
                        ? this.findNestedObjectTypes(value)
                        : type
                };
                if (column.name !== '') {
                    acc.push(column);
                }
                return acc;
            }, []);
        }
        else {
            return [];
        }
    }
    checkKeyValuesUniqueness(array, key) {
        const uniqueValues = [];
        array.forEach(function (object) {
            if (!uniqueValues.includes(object)) {
                uniqueValues.push(object[key]);
            }
        });
        return uniqueValues.length === array.length;
    }
}
exports.default = ApiColumnsHelper;
//# sourceMappingURL=api-columns.helper.js.map
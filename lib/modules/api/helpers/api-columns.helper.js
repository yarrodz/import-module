"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_connector_1 = __importDefault(require("../connector/api-connector"));
const resolve_path_1 = __importDefault(require("../../../utils/resolve-path/resolve-path"));
const transfer_method_enum_1 = require("../../transfers/enums/transfer-method.enum");
class ApiColumnsHelper {
    async find(impt) {
        try {
            const { transferMethod, datasetsPath } = impt;
            const apiConnector = new api_connector_1.default(impt);
            await apiConnector.authRequest();
            let response;
            switch (transferMethod) {
                case transfer_method_enum_1.TransferMethod.CHUNK: {
                    response = await apiConnector.sendRequest();
                    break;
                }
                case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                    const pagination = {
                        offset: 0,
                        limit: 1
                    };
                    apiConnector.paginateRequest(pagination);
                    response = await apiConnector.sendRequest();
                    break;
                }
                case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                    const pagination = {
                        limit: 1
                    };
                    apiConnector.paginateRequest(pagination);
                    response = await apiConnector.sendRequest();
                    break;
                }
                default: {
                    throw new Error(`Error wlile searching for columns. Unknown transfer method: '${transferMethod}'.`);
                }
            }
            const datasets = (0, resolve_path_1.default)(response, datasetsPath);
            const dataset = datasets[0];
            const columns = this.findNestedObjectTypes(dataset);
            return columns;
        }
        catch (error) {
            throw new Error(`Error while searching columns for API: ${error.message}`);
        }
    }
    async checkIdColumnUniqueness(impt) {
        try {
            const { transferMethod, datasetsPath, idKey } = impt;
            const apiConnector = new api_connector_1.default(impt);
            await apiConnector.authRequest();
            switch (transferMethod) {
                case transfer_method_enum_1.TransferMethod.CHUNK: {
                    const response = await apiConnector.sendRequest();
                    const datasets = (0, resolve_path_1.default)(response, datasetsPath);
                    return this.checkKeyValuesUniqueness(datasets, idKey);
                }
                case transfer_method_enum_1.TransferMethod.OFFSET_PAGINATION: {
                    return true;
                }
                case transfer_method_enum_1.TransferMethod.CURSOR_PAGINATION: {
                    return true;
                }
                default: {
                    throw new Error(`Unknown transfer method: ${transferMethod}`);
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
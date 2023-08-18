"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auth_request_helper_1 = __importDefault(require("./auth-request.helper"));
const paginate_request_helper_1 = __importDefault(require("./paginate-request.helper"));
class ApiConnector {
    constructor(impt) {
        const { request, transferMethod, paginationOptions } = impt;
        const connection = impt.__.hasConnection;
        this.request = { ...request, data: request.body };
        this.auth = connection;
        this.paginationType = transferMethod;
        this.paginationOptions = paginationOptions;
    }
    async sendRequest() {
        try {
            return await (0, axios_1.default)(this.request);
        }
        catch (error) {
            throw new Error(`Error while sending request: ${error.message}`);
        }
    }
    async authRequest() {
        await auth_request_helper_1.default.auth(this.request, this.auth);
    }
    paginateRequest(pagination) {
        paginate_request_helper_1.default.paginate(this.request, this.paginationType, this.paginationOptions, pagination);
    }
}
exports.default = ApiConnector;
//# sourceMappingURL=api-connector.js.map
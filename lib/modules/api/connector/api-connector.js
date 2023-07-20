"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auth_request_helper_1 = __importDefault(require("./auth-request.helper"));
const paginate_request_helper_1 = __importDefault(require("./paginate-request.helper"));
const parse_response_helper_1 = __importDefault(require("./parse-response.helper"));
class ApiConnector {
    constructor(api) {
        this.authRequestHelper = new auth_request_helper_1.default();
        this.paginateRequestHelper = new paginate_request_helper_1.default();
        this.parseResponseHelper = new parse_response_helper_1.default();
        const { method, url, auth, headers, params, body, transferType, paginationOptions, responseType } = api;
        this.request = {
            method,
            url,
            headers,
            params,
            data: body
        };
        this.auth = auth;
        this.paginationType = transferType;
        this.paginationOptions = paginationOptions;
        this.responseType = responseType;
    }
    async sendRequest() {
        try {
            const response = await (0, axios_1.default)(this.request);
            const parsedResponse = this.parseResponse(response, this.responseType);
            return parsedResponse;
        }
        catch (error) {
            throw new Error(`Error while sending request: ${error.message}`);
        }
    }
    async authorizeRequest() {
        await this.authRequestHelper.auth(this.request, this.auth);
    }
    paginateRequest(pagination) {
        this.paginateRequestHelper.paginate(this.request, this.paginationType, this.paginationOptions, pagination);
    }
    parseResponse(data, responseType) {
        return this.parseResponseHelper.parse(data, responseType);
    }
}
exports.default = ApiConnector;
//# sourceMappingURL=api-connector.js.map
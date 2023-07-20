"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_response_type_enum_1 = require("../enums/request-response-type.enum");
class ParseResponseHelper {
    parse(data, responseType) {
        try {
            switch (responseType) {
                case request_response_type_enum_1.RequestResponseType.JSON: {
                    return data;
                }
                case request_response_type_enum_1.RequestResponseType.CSV_JSON: {
                    return this.parseCsvFormattedJson(data);
                }
            }
        }
        catch (error) {
            throw new Error(`Error while parsing response: ${error.message}`);
        }
    }
    parseCsvFormattedJson(data) {
        const keys = data[0];
        const values = data.slice(1);
        return values.map((value) => {
            const object = {};
            for (let i = 0; i < keys.length; i++) {
                object[keys[i]] = value[i];
            }
            return object;
        });
    }
}
exports.default = ParseResponseHelper;
//# sourceMappingURL=parse-response.helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_type_enum_1 = require("./response-type.enum");
class ResponseHandler {
    constructor(type, statusCode, result, message) {
        this.type = type;
        this.statusCode = statusCode;
        this.result = result;
        this.message = message;
    }
    setSuccess(statusCode, result) {
        this.type = response_type_enum_1.ResponseType.SUCCESS;
        this.statusCode = statusCode;
        this.result = result;
    }
    setError(statusCode, message) {
        this.type = response_type_enum_1.ResponseType.ERROR;
        this.statusCode = statusCode;
        this.message = message;
    }
    send(res) {
        switch (this.type) {
            case response_type_enum_1.ResponseType.SUCCESS:
                res.status(this.statusCode).json(this.result);
                break;
            case response_type_enum_1.ResponseType.ERROR:
                res.status(this.statusCode).json({ message: this.message });
                break;
        }
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=response-handler.js.map
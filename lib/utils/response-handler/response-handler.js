"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_type_enum_1 = require("./response-handler-type.enum");
class ResponseHandler {
    constructor(type, statusCode, result, message, redirectUri) {
        this.type = type;
        this.statusCode = statusCode;
        this.result = result;
        this.message = message;
        this.redirectUri = redirectUri;
    }
    setSuccess(statusCode, result) {
        this.type = response_handler_type_enum_1.ResponseHandlerType.SUCCESS;
        this.statusCode = statusCode;
        this.result = result;
    }
    setError(statusCode, message) {
        this.type = response_handler_type_enum_1.ResponseHandlerType.ERROR;
        this.statusCode = statusCode;
        this.message = message;
    }
    setRedirect(uri) {
        this.type = response_handler_type_enum_1.ResponseHandlerType.REDIRECT;
        this.statusCode = 201;
        this.redirectUri = uri;
    }
    send(res) {
        switch (this.type) {
            case response_handler_type_enum_1.ResponseHandlerType.SUCCESS:
                res.status(this.statusCode).json(this.result);
                break;
            case response_handler_type_enum_1.ResponseHandlerType.ERROR:
                res.status(this.statusCode).json({ message: this.message });
                break;
            case response_handler_type_enum_1.ResponseHandlerType.REDIRECT:
                res.status(this.statusCode).redirect(this.redirectUri);
                break;
            default:
                throw new Error(`Unknown response handler type.`);
        }
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=response-handler.js.map
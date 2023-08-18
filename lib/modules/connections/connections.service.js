"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = __importDefault(require("../../utils/response-handler/response-handler"));
const source_enum_1 = require("../imports/enums/source.enum");
const create_sql_connection_validator_1 = require("../sql/validators/create-sql-connection.validator");
const create_api_connection_validator_1 = require("../api/validators/create-api-connection.validator");
const update_sql_connection_validator_1 = require("../sql/validators/update-sql-connection.validator");
const update_api_connection_validator_1 = require("../api/validators/update-api-connection.validator");
class ConnectionsService {
    constructor(connectionsRepository) {
        this.connectionsRepository = connectionsRepository;
    }
    async getAll(select, sortings) {
        const responseHandler = new response_handler_1.default();
        try {
            const connections = await this.connectionsRepository.query(select, sortings, false);
            responseHandler.setSuccess(200, connections);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async get(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const connection = await this.connectionsRepository.load(id);
            responseHandler.setSuccess(200, connection);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async create(input) {
        let responseHandler = new response_handler_1.default();
        try {
            const { source } = input;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    const { error } = create_sql_connection_validator_1.CreateSqlConnectionValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                case source_enum_1.Source.API: {
                    const { error } = create_api_connection_validator_1.CreateApiConnectionValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
            const connection = await this.connectionsRepository.create(input);
            responseHandler.setSuccess(200, connection);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async update(input) {
        let responseHandler = new response_handler_1.default();
        try {
            const { source } = input;
            switch (source) {
                case source_enum_1.Source.SQL: {
                    const { error } = update_sql_connection_validator_1.UpdateSqlConnectionValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                case source_enum_1.Source.API: {
                    const { error } = update_api_connection_validator_1.UpdateApiConnectionValidator.validate(input);
                    if (error) {
                        responseHandler.setError(400, error);
                        return responseHandler;
                    }
                    break;
                }
                default: {
                    responseHandler.setError(400, `Error while creating import. Unknown source '${source}'.`);
                    return responseHandler;
                }
            }
            const { id } = input;
            const connection = await this.connectionsRepository.load(id);
            if (!connection) {
                responseHandler.setError(404, 'Connection not found');
                return responseHandler;
            }
            const updatedConnection = await this.connectionsRepository.update(input);
            responseHandler.setSuccess(200, updatedConnection);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
    async delete(id) {
        const responseHandler = new response_handler_1.default();
        try {
            const connection = await this.connectionsRepository.load(id);
            if (!connection) {
                responseHandler.setError(404, 'Connection not found');
                return responseHandler;
            }
            await this.connectionsRepository.delete(id);
            responseHandler.setSuccess(200, true);
            return responseHandler;
        }
        catch (error) {
            responseHandler.setError(500, error.message);
            return responseHandler;
        }
    }
}
exports.default = ConnectionsService;
//# sourceMappingURL=connections.service.js.map
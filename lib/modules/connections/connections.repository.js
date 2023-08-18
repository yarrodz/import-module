"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iFrameConnection_1 = __importDefault(require("./iFrameConnection"));
const transform_iFrame_instance_1 = __importDefault(require("../../utils/transform-iFrame-instance/transform-iFrame-instance"));
class ConnectionsRepository {
    constructor(client) {
        this.client = client;
    }
    async query(select, sortings, firstOnly) {
        try {
            return await new iFrameConnection_1.default(this.client).query(select, sortings, firstOnly);
        }
        catch (error) {
            throw new error(`Error while querying connections: ${error}`);
        }
    }
    async load(id) {
        try {
            return await new iFrameConnection_1.default(this.client)
                .load(id)
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
        }
        catch (error) {
            throw new error(`Error while loading a connection: ${error}`);
        }
    }
    async create(input) {
        try {
            return await new iFrameConnection_1.default(this.client)
                .insert(input)
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
        }
        catch (error) {
            throw new error(`Error while creating a connection: ${error}`);
        }
    }
    async update(input) {
        try {
            return await new iFrameConnection_1.default(this.client, input, input.id)
                .save()
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
        }
        catch (error) {
            throw new error(`Error while updating a connection: ${error}`);
        }
    }
    async delete(id) {
        try {
            return await new iFrameConnection_1.default(this.client).delete(id);
        }
        catch (error) {
            throw new error(`Error while deleting a connection: ${error}`);
        }
    }
}
exports.default = ConnectionsRepository;
//# sourceMappingURL=connections.repository.js.map
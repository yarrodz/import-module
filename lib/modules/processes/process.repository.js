"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iFrameProcess_1 = __importDefault(require("./iFrameProcess"));
const transform_iFrame_instance_1 = __importDefault(require("../../utils/transform-iFrame-instance/transform-iFrame-instance"));
class ProcessesRepository {
    constructor(client) {
        this.client = client;
    }
    async query(select, sortings, firstOnly) {
        try {
            return await new iFrameProcess_1.default(this.client).query(select, sortings, firstOnly);
        }
        catch (error) {
            throw new error(`Error while querying processes: ${error}`);
        }
    }
    async load(id) {
        try {
            return await new iFrameProcess_1.default(this.client)
                .load(id)
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
        }
        catch (error) {
            throw new error(`Error while loading a process: ${error}`);
        }
    }
    async create(input) {
        try {
            const result = await new iFrameProcess_1.default(this.client)
                .insert(input)
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
            return result;
        }
        catch (error) {
            throw new error(`Error while creating a process: ${error}`);
        }
    }
    async update(input) {
        try {
            return await new iFrameProcess_1.default(this.client, input, input.id)
                .save()
                .then((result) => (0, transform_iFrame_instance_1.default)(result));
        }
        catch (error) {
            throw new error(`Error while updating a process: ${error}`);
        }
    }
    async delete(id) {
        try {
            return await new iFrameProcess_1.default(this.client).delete(id);
        }
        catch (error) {
            throw new error(`Error while deleting a process: ${error}`);
        }
    }
}
exports.default = ProcessesRepository;
//# sourceMappingURL=process.repository.js.map
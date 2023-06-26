"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_status_enum_1 = require("./enums/import-status.enum");
class ImportProcessesRepository {
    constructor(importProcessModel) {
        this.importProcessModel = importProcessModel;
    }
    async create(input) {
        try {
            return await this.importProcessModel.create(input);
        }
        catch (error) {
            throw new error(`Error while query for creating import: ${error.message}`);
        }
    }
    async findAll(unit) {
        try {
            return await this.importProcessModel.find({ unit }).lean();
        }
        catch (error) {
            throw new error(`Error while quering import processes: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await this.importProcessModel.findById(id).lean();
        }
        catch (error) {
            throw new error(`Error while quering import process: ${error.message}`);
        }
    }
    async findPendingByUnit(unit) {
        return await this.importProcessModel.findOne({
            unit,
            status: import_status_enum_1.ImportStatus.PENDING
        });
    }
    async update(id, updateQuery) {
        try {
            return await this.importProcessModel.findByIdAndUpdate(id, updateQuery, {
                new: true
            });
        }
        catch (error) {
            throw new error(`Error while query for updating import process: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await this.importProcessModel.findByIdAndDelete(id);
        }
        catch (error) {
            throw new error(`Error while query for delete import process: ${error.message}`);
        }
    }
}
exports.default = ImportProcessesRepository;
//# sourceMappingURL=import-processes.repository.js.map
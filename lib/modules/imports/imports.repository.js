"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportsRepository {
    constructor(importsModel) {
        this.importsModel = importsModel;
    }
    async create(input) {
        try {
            return await this.importsModel.create(input);
        }
        catch (error) {
            throw new error(`Error while query for creating import: ${error.message}`);
        }
    }
    async findAll(unit) {
        try {
            return await this.importsModel.find({ unit }).lean();
        }
        catch (error) {
            throw new error(`Error while quering imports: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await this.importsModel.findById(id);
        }
        catch (error) {
            throw new error(`Error while quering import: ${error.message}`);
        }
    }
    async update(id, updateQuery) {
        try {
            return await this.importsModel.findByIdAndUpdate(id, updateQuery, {
                new: true
            });
        }
        catch (error) {
            throw new error(`Error while query for updating import: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await this.importsModel.findByIdAndDelete(id);
        }
        catch (error) {
            throw new error(`Error while query for delete import: ${error.message}`);
        }
    }
}
exports.default = ImportsRepository;
//# sourceMappingURL=imports.repository.js.map
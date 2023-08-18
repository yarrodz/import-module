"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iframe_ai_1 = require("iframe-ai");
class DatasetsRepository {
    constructor(client) {
        this.client = client;
    }
    async bulkSave(datasets) {
        try {
            await new iframe_ai_1.iFrameDataset(this.client).bulkSave(datasets);
        }
        catch (error) {
            throw new Error(`Error while bulkSave datasets: ${error}`);
        }
    }
}
exports.default = DatasetsRepository;
//# sourceMappingURL=datasets.repository.js.map
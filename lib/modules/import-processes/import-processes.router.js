"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ImportProcessesRouter {
    constructor(importProcessesController) {
        this.router = (0, express_1.Router)();
        this.importProcessesController = importProcessesController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/:unitId', this.importProcessesController.findAll);
        this.router.delete('/:id', this.importProcessesController.delete);
        this.router.post('/pause', this.importProcessesController.pause);
        this.router.post('/reload', this.importProcessesController.reload);
        this.router.post('/retry', this.importProcessesController.retry);
    }
}
exports.default = ImportProcessesRouter;
//# sourceMappingURL=import-processes.router.js.map
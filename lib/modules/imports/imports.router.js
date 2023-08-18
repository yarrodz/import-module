"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ImportsRouter {
    constructor(ImportsController) {
        this.router = (0, express_1.Router)();
        this.importsController = ImportsController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/getAll', this.importsController.getAll);
        this.router.get('/:id', this.importsController.get);
        this.router.post('/', this.importsController.create);
        this.router.patch('/', this.importsController.update);
        this.router.delete('/:id', this.importsController.delete);
        this.router.post('/columns', this.importsController.getColumns);
        this.router.post('/idColumnUniqueness', this.importsController.checkIdColumnUniqueness);
        this.router.post('/import', this.importsController.import);
    }
}
exports.default = ImportsRouter;
//# sourceMappingURL=imports.router.js.map
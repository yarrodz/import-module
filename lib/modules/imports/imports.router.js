"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ImportsRouter {
    constructor(importsController) {
        this.router = (0, express_1.Router)();
        this.importsController = importsController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/:unitId', this.importsController.findAll);
        this.router.post('/', this.importsController.create);
        this.router.put('/', this.importsController.update);
        this.router.delete('/:id', this.importsController.delete);
        this.router.post('/connect', this.importsController.connect);
        this.router.post('/setFields', this.importsController.setFields);
        this.router.post('/start', this.importsController.start);
    }
}
exports.default = ImportsRouter;
//# sourceMappingURL=imports.router.js.map
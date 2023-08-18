"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TransfersRouter {
    constructor(transfersController) {
        this.router = (0, express_1.Router)();
        this.transfersController = transfersController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/getAll', this.transfersController.getAll);
        this.router.delete('/:id', this.transfersController.delete);
        this.router.post('/pause', this.transfersController.pause);
        this.router.post('/reload', this.transfersController.reload);
        this.router.post('/retry', this.transfersController.retry);
    }
}
exports.default = TransfersRouter;
//# sourceMappingURL=transfers.router.js.map
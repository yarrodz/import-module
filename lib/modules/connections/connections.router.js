"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ConnectionsRouter {
    constructor(connectionsController) {
        this.router = (0, express_1.Router)();
        this.connectionsController = connectionsController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/getAll', this.connectionsController.getAll);
        this.router.get('/:id', this.connectionsController.get);
        this.router.post('/', this.connectionsController.create);
        this.router.patch('/', this.connectionsController.update);
        this.router.delete('/:id', this.connectionsController.delete);
    }
}
exports.default = ConnectionsRouter;
//# sourceMappingURL=connections.router.js.map
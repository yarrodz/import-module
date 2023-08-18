"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionsController {
    constructor(connectionsService) {
        this.getAll = async (req, res) => {
            const { select, sortings } = req.body;
            const responseHandler = await this.connectionsService.getAll(select, sortings);
            responseHandler.send(res);
        };
        this.get = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.connectionsService.get(Number(id));
            responseHandler.send(res);
        };
        this.create = async (req, res) => {
            const input = req.body;
            const responseHandler = await this.connectionsService.create(input);
            responseHandler.send(res);
        };
        this.update = async (req, res) => {
            const input = req.body;
            const responseHandler = await this.connectionsService.update(input);
            responseHandler.send(res);
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.connectionsService.delete(Number(id));
            responseHandler.send(res);
        };
        this.connectionsService = connectionsService;
    }
}
exports.default = ConnectionsController;
//# sourceMappingURL=connections.controller.js.map
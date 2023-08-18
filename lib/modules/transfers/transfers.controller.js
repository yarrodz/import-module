"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersController = void 0;
class TransfersController {
    constructor(transfersService) {
        this.getAll = async (req, res) => {
            const { select, sortings } = req.body;
            const responseHandler = await this.transfersService.getAll(select, sortings);
            responseHandler.send(res);
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.transfersService.delete(Number(id));
            responseHandler.send(res);
        };
        this.pause = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.transfersService.pause(id);
            responseHandler.send(res);
        };
        this.reload = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.transfersService.reload(req, id);
            responseHandler.send(res);
        };
        this.retry = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.transfersService.retry(req, id);
            responseHandler.send(res);
        };
        this.transfersService = transfersService;
    }
}
exports.TransfersController = TransfersController;
exports.default = TransfersController;
//# sourceMappingURL=transfers.controller.js.map
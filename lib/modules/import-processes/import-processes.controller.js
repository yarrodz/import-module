"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportProcessesController = void 0;
class ImportProcessesController {
    constructor(importsService) {
        this.findAll = async (req, res) => {
            const unitId = req.params.unitId;
            const responseHandler = await this.importProcessesService.findAll(unitId);
            responseHandler.send(res);
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.importProcessesService.delete(id);
            responseHandler.send(res);
        };
        this.pause = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importProcessesService.pause(id);
            responseHandler.send(res);
        };
        this.reload = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importProcessesService.reload(req, id);
            responseHandler.send(res);
        };
        this.retry = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importProcessesService.retry(req, id);
            responseHandler.send(res);
        };
        this.importProcessesService = importsService;
    }
}
exports.ImportProcessesController = ImportProcessesController;
exports.default = ImportProcessesController;
//# sourceMappingURL=import-processes.controller.js.map
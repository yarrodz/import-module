"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportsController {
    constructor(importsService) {
        this.getAll = async (req, res) => {
            const { select, sortings } = req.body;
            const responseHandler = await this.importsService.getAll(select, sortings);
            responseHandler.send(res);
        };
        this.get = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.importsService.get(Number(id));
            responseHandler.send(res);
        };
        this.create = async (req, res) => {
            const input = req.body;
            const responseHandler = await this.importsService.create(input);
            responseHandler.send(res);
        };
        this.update = async (req, res) => {
            const input = req.body;
            const responseHandler = await this.importsService.update(input);
            responseHandler.send(res);
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.importsService.delete(Number(id));
            responseHandler.send(res);
        };
        this.getColumns = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importsService.getColumns(req, id);
            responseHandler.send(res);
        };
        this.checkIdColumnUniqueness = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importsService.getColumns(req, id);
            responseHandler.send(res);
        };
        this.import = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importsService.import(req, id);
            responseHandler.send(res);
        };
        this.importsService = importsService;
    }
}
exports.default = ImportsController;
//# sourceMappingURL=imports.controller.js.map
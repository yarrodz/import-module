"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportsController {
    constructor(importsService) {
        this.findAll = async (req, res) => {
            const unitId = req.params.unitId;
            const responseHandler = await this.importsService.findAll(unitId);
            responseHandler.send(res);
        };
        this.create = async (req, res) => {
            const impt = req.body;
            const responseHandler = await this.importsService.create(req, impt);
            responseHandler.send(res);
        };
        this.update = async (req, res) => {
            const id = req.body.id;
            const impt = req.body.impt;
            const responseHandler = await this.importsService.update(req, id, impt);
            responseHandler.send(res);
        };
        this.connect = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importsService.connect(req, id);
            responseHandler.send(res);
        };
        this.setFields = async (req, res) => {
            const id = req.body.id;
            const fields = req.body.fields;
            const responseHandler = await this.importsService.setFields(id, fields);
            responseHandler.send(res);
        };
        this.start = async (req, res) => {
            const id = req.body.id;
            const responseHandler = await this.importsService.start(req, id);
            responseHandler.send(res);
        };
        this.delete = async (req, res) => {
            const id = req.params.id;
            const responseHandler = await this.importsService.delete(id);
            responseHandler.send(res);
        };
        this.importsService = importsService;
    }
}
exports.default = ImportsController;
//# sourceMappingURL=imports.controller.js.map
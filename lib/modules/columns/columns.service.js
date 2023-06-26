"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_source_enum_1 = require("../imports/enums/import-source.enum");
class ColumnsService {
    constructor(findSQLColumnsService) {
        this.findSQLColumnsService = findSQLColumnsService;
    }
    async find(impt) {
        let columns = [];
        switch (impt.source) {
            case import_source_enum_1.ImportSource.MYSQL:
            case import_source_enum_1.ImportSource.POSTGRESQL:
            case import_source_enum_1.ImportSource.MICROSOFT_SQL_SERVER:
            case import_source_enum_1.ImportSource.ORACLE:
            case import_source_enum_1.ImportSource.MARIADB:
            case import_source_enum_1.ImportSource.ORACLE:
                columns = await this.findSQLColumnsService.find(impt);
                break;
            //   case ImportSource.API:
            //     columns = await receiveApiColumns(impt);
            //     break;
            //   case ImportSource.IMAP:
            //     throw new Error('Not implemented');
            default:
                throw new Error(`Unexpected import source for receiving columns: ${impt.source}`);
        }
        return columns;
    }
    async checkIdColumnUniqueness(impt) {
        let idColumnUnique;
        switch (impt.source) {
            case import_source_enum_1.ImportSource.MYSQL:
            case import_source_enum_1.ImportSource.POSTGRESQL:
            case import_source_enum_1.ImportSource.MICROSOFT_SQL_SERVER:
            case import_source_enum_1.ImportSource.ORACLE:
            case import_source_enum_1.ImportSource.MARIADB:
            case import_source_enum_1.ImportSource.ORACLE:
                idColumnUnique =
                    await this.findSQLColumnsService.checkIdColumnUniqueness(impt);
                break;
            //   case ImportSource.API:
            //     columns = await receiveApiColumns(impt);
            //     break;
            //   case ImportSource.IMAP:
            //     throw new Error('Not implemented');
            default:
                throw new Error(`Unexpected import source for receiving columns: ${impt.source}`);
        }
        return idColumnUnique;
    }
}
exports.default = ColumnsService;
//# sourceMappingURL=columns.service.js.map
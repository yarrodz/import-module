"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_connection_1 = require("../../../utils/sql/sql.connection");
const sql_dialect_map_1 = require("../../../utils/sql/sql.dialect-map");
const create_requested_fields_1 = require("../../../utils/sql/create-requested-fields");
const sql_query_builder_1 = require("../../../utils/sql/sql.query-builder");
const database_import_target_enum_1 = require("../../imports/enums/database-import-target.enum");
class TransferSQLService {
    constructor(importProcessesRepository, transferHelper) {
        this.tablePaginationFunction = async (offset, limit, sqlConnection, dialect, table, idColumn, requestedFields) => {
            const rowsQuery = (0, sql_query_builder_1.createSelectDataQuery)(dialect, table, idColumn, offset, limit, requestedFields);
            return await sqlConnection.queryRows(rowsQuery);
        };
        this.customSelectPaginationFunction = async (offset, limit, sqlConnection, dialect, customSelect, idColumn) => {
            const paginatedQuery = (0, sql_query_builder_1.paginateQuery)(dialect, customSelect, idColumn, offset, limit);
            return await sqlConnection.queryRows(paginatedQuery);
        };
        this.importProcessesRepository = importProcessesRepository;
        this.transferHelper = transferHelper;
    }
    async transfer(impt, process, limit) {
        let sqlConnection;
        try {
            const { source, database } = impt;
            const { connection, table, target } = database;
            const processId = process._id;
            const dialect = sql_dialect_map_1.SQLDialectMap[source];
            sqlConnection = new sql_connection_1.SqlConnection({
                ...connection,
                dialect
            });
            await sqlConnection.connect();
            const offset = process.processedDatasetsCount;
            switch (target) {
                case database_import_target_enum_1.DatabaseImportTarget.TABLE:
                    await this.transferFromTable(impt, processId, sqlConnection, source, offset, limit);
                    break;
                //transfer from custom select
                case database_import_target_enum_1.DatabaseImportTarget.CUSTOM_SELECT:
                    await this.transferFromCustomSelect(impt, processId, sqlConnection, source, offset, limit);
                    break;
                default:
                    throw new Error('Unexpected database import target');
            }
            sqlConnection.disconnect();
        }
        catch (error) {
            sqlConnection.disconnect();
            throw error;
        }
    }
    async transferFromTable(impt, processId, sqlConnection, dialect, offset, limit) {
        const { database, fields } = impt;
        const { idColumn, table } = database;
        const countQuery = (0, sql_query_builder_1.createSelectCountQuery)(table);
        const datasetsCount = await sqlConnection.queryResult(countQuery);
        await this.importProcessesRepository.update(processId, { datasetsCount });
        const requestedFields = (0, create_requested_fields_1.createRequestedFields)(fields, idColumn);
        await this.transferHelper.paginationTransfer(impt, processId, idColumn, datasetsCount, offset, limit, this.tablePaginationFunction, sqlConnection, dialect, table, idColumn, requestedFields);
    }
    async transferFromCustomSelect(impt, processId, sqlConnection, dialect, offset, limit) {
        const { database } = impt;
        const { idColumn, customSelect, datasetsCount } = database;
        await this.importProcessesRepository.update(processId, { datasetsCount });
        await this.transferHelper.paginationTransfer(impt, processId, idColumn, datasetsCount, offset, limit, this.customSelectPaginationFunction, sqlConnection, dialect, customSelect, idColumn);
    }
}
exports.default = TransferSQLService;
//# sourceMappingURL=transfer-sql.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_connector_1 = require("./connector/sql.connector");
const create_requested_fields_1 = require("./connector/create-requested-fields");
const sql_query_builder_1 = require("./connector/sql.query-builder");
const sql_sequelize_dialect_map_1 = require("./connector/sql-sequelize-dialect.map");
const sql_import_target_enum_1 = require("./enums/sql-import-target.enum");
class SqlTransferHelper {
    constructor(importProcessesRepository, importTransferFailureHandler, offsetPaginationTransferHelper) {
        this.transfer = async (impt, process) => {
            let sqlConnector;
            try {
                const { sql } = impt;
                const { connection, target, dialect } = sql;
                const processId = process._id;
                const sequelizeDialect = sql_sequelize_dialect_map_1.SqlSequelizeDialectMap[dialect];
                sqlConnector = new sql_connector_1.SqlConnector({
                    ...JSON.parse(JSON.stringify(connection)),
                    dialect: sequelizeDialect
                });
                await sqlConnector.connect();
                //transfer from table
                switch (target) {
                    case sql_import_target_enum_1.SqlImportTarget.TABLE: {
                        await this.transferFromTable(impt, processId, sqlConnector, dialect);
                        //transfer from custom select
                        break;
                    }
                    case sql_import_target_enum_1.SqlImportTarget.SELECT: {
                        await this.transferFromSelect(impt, processId, sqlConnector, dialect);
                        break;
                    }
                    default: {
                        throw new Error(`Unknown sql import target: ${target}`);
                    }
                }
                sqlConnector.disconnect();
            }
            catch (error) {
                sqlConnector.disconnect();
                this.importTransferFailureHandler.handle(error, this.transfer, impt, process);
            }
        };
        this.tablePaginationFunction = async (offsetPagination, sqlConnector, dialect, table, idColumn, requestedFields) => {
            const { offset, limit } = offsetPagination;
            const rowsQuery = (0, sql_query_builder_1.createSelectDataQuery)(dialect, table, idColumn, offset, limit, requestedFields);
            return await sqlConnector.queryRows(rowsQuery);
        };
        this.selectPaginationFunction = async (offsetPagination, sqlConnector, dialect, select, idColumn) => {
            const { offset, limit } = offsetPagination;
            const paginatedQuery = (0, sql_query_builder_1.paginateQuery)(dialect, select, idColumn, offset, limit);
            return await sqlConnector.queryRows(paginatedQuery);
        };
        this.importProcessesRepository = importProcessesRepository;
        this.importTransferFailureHandler = importTransferFailureHandler;
        this.offsetPaginationTransferHelper = offsetPaginationTransferHelper;
    }
    async transferFromTable(impt, processId, sqlConnector, dialect) {
        const { sql, fields, idColumn } = impt;
        const { table, limit } = sql;
        const countQuery = (0, sql_query_builder_1.createSelectCountQuery)(table);
        const datasetsCount = await sqlConnector.queryResult(countQuery);
        await this.importProcessesRepository.update(processId, { datasetsCount });
        const requestedFields = (0, create_requested_fields_1.createRequestedFields)(fields, idColumn);
        await this.offsetPaginationTransferHelper.offsetPaginationTransfer(impt, processId, limit, this.tablePaginationFunction, sqlConnector, dialect, table, idColumn, requestedFields);
    }
    async transferFromSelect(impt, processId, sqlConnector, dialect) {
        const { sql, datasetsCount } = impt;
        const { select, limit } = sql;
        await this.importProcessesRepository.update(processId, { datasetsCount });
        await this.offsetPaginationTransferHelper.offsetPaginationTransfer(impt, processId, limit, this.selectPaginationFunction, sqlConnector, dialect, select);
    }
}
exports.default = SqlTransferHelper;
//# sourceMappingURL=sql-transfer.helper.js.map
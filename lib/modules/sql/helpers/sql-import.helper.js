"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_import_target_enum_1 = require("../enums/sql-import-target.enum");
const sql_table_query_builder_1 = require("../connector/sql-table.query-builder");
const sql_select_query_builder_1 = require("../connector/sql-select.query-builder");
const sql_connector_1 = require("../connector/sql.connector");
const create_requested_fields_1 = require("../connector/create-requested-fields");
class SqlImportHelper {
    constructor(transferFailureHandler, offsetPaginationTransferHelper, transfersReporisotory) {
        this.import = async (params) => {
            let sqlConnector;
            const impt = params.import;
            const { transfer } = params;
            const { target } = impt;
            const connection = impt.__.hasConnection;
            const { config } = connection;
            const { dialect } = config;
            try {
                sqlConnector = new sql_connector_1.SqlConnector(config);
                await sqlConnector.connect();
                switch (target) {
                    case sql_import_target_enum_1.SqlImportTarget.TABLE: {
                        await this.tableImport(impt, transfer, sqlConnector, dialect);
                        break;
                    }
                    case sql_import_target_enum_1.SqlImportTarget.SELECT: {
                        await this.selectImport(impt, transfer, sqlConnector);
                        break;
                    }
                    default: {
                        throw new Error(`Unknown sql import target: ${target}.`);
                    }
                }
                sqlConnector.disconnect();
            }
            catch (error) {
                sqlConnector && sqlConnector.disconnect();
                this.transferFailureHandler.handle({
                    error,
                    outerTransferFunction: this.import,
                    import: impt,
                    transfer
                });
            }
        };
        this.tablePaginationFunction = async (offsetPagination, sqlConnector, dialect, table, idColumn, requestedFields) => {
            const { offset, limit } = offsetPagination;
            const rowsQuery = (0, sql_table_query_builder_1.createSqlTableFindDataQuery)(dialect, table, idColumn, offset, limit, requestedFields);
            return await sqlConnector.queryRows(rowsQuery);
        };
        this.selectPaginationFunction = async (offsetPagination, sqlConnector, select, idColumn) => {
            const { offset, limit } = offsetPagination;
            const paginatedQuery = (0, sql_select_query_builder_1.paginateSqlSelect)(select, idColumn, offset, limit);
            return await sqlConnector.queryRows(paginatedQuery);
        };
        this.transferFailureHandler = transferFailureHandler;
        this.offsetPaginationTransferHelper = offsetPaginationTransferHelper;
        this.transfersReporisotory = transfersReporisotory;
    }
    async tableImport(impt, transfer, sqlConnector, dialect) {
        const { id: transferId } = transfer;
        const { table, limit, fields, idKey } = impt;
        const countQuery = (0, sql_table_query_builder_1.createSqlTableCountQuery)(table);
        const datasetsCount = await sqlConnector.queryResult(countQuery);
        const updatedTransfer = await this.transfersReporisotory.update({
            id: transferId,
            datasetsCount: Number(datasetsCount)
        });
        const requestedFields = (0, create_requested_fields_1.createRequestedFields)(fields, idKey);
        const offsetPaginationTransferParams = {
            import: impt,
            transfer: updatedTransfer,
            limitPerStep: limit,
            paginationFunction: {
                fn: this.tablePaginationFunction,
                params: [sqlConnector, dialect, table, idKey, requestedFields]
            }
        };
        await this.offsetPaginationTransferHelper.transfer(offsetPaginationTransferParams);
    }
    async selectImport(impt, transfer, sqlConnector) {
        const { select, limit, idKey } = impt;
        const offsetPaginationTransferParams = {
            import: impt,
            transfer,
            limitPerStep: limit,
            paginationFunction: {
                fn: this.selectPaginationFunction,
                params: [sqlConnector, select, idKey]
            }
        };
        await this.offsetPaginationTransferHelper.transfer(offsetPaginationTransferParams);
    }
}
exports.default = SqlImportHelper;
//# sourceMappingURL=sql-import.helper.js.map
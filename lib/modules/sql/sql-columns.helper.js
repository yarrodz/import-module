"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_connector_1 = require("./connector/sql.connector");
const sql_sequelize_dialect_map_1 = require("./connector/sql-sequelize-dialect.map");
const sql_import_target_enum_1 = require("./enums/sql-import-target.enum");
const sql_table_query_builder_1 = require("./connector/sql-table.query-builder");
const sql_select_query_builder_1 = require("./connector/sql-select.query-builder");
class SqlColumnsHelper {
    async find(impt) {
        let sqlConnector;
        try {
            const { sql, idColumn } = impt;
            const { connection, target, table, select, dialect } = sql;
            const sequelizeDialect = sql_sequelize_dialect_map_1.SqlSequelizeDialectMap[dialect];
            sqlConnector = new sql_connector_1.SqlConnector({
                ...connection,
                dialect: sequelizeDialect
            });
            await sqlConnector.connect();
            let columns = [];
            switch (target) {
                case sql_import_target_enum_1.SqlImportTarget.TABLE: {
                    try {
                        columns = await this.selectColumnsFromSchema(sqlConnector, table, dialect);
                        //Maybe user have no access to information schema then we receive columns from dataset
                    }
                    catch (error) {
                        const query = (0, sql_table_query_builder_1.createSqlTableFindDataQuery)(dialect, table, idColumn, 0, 1);
                        columns = await this.selectColumnsFromDataset(sqlConnector, query);
                    }
                    break;
                }
                case sql_import_target_enum_1.SqlImportTarget.SELECT: {
                    const query = (0, sql_select_query_builder_1.paginateSqlSelect)(select, idColumn, 0, 1);
                    columns = await this.selectColumnsFromDataset(sqlConnector, query);
                    break;
                }
                default: {
                    throw new Error(`Unknown sql import target: ${target}`);
                }
            }
            sqlConnector.disconnect();
            return columns;
        }
        catch (error) {
            sqlConnector.disconnect();
            throw error;
        }
    }
    async checkIdColumnUniqueness(impt) {
        let sqlConnector;
        try {
            const { sql, idColumn } = impt;
            const { connection, target, table, dialect } = sql;
            const sequelizeDialect = sql_sequelize_dialect_map_1.SqlSequelizeDialectMap[dialect];
            sqlConnector = new sql_connector_1.SqlConnector({
                ...connection,
                dialect: sequelizeDialect
            });
            await sqlConnector.connect();
            let isUnique;
            switch (target) {
                case sql_import_target_enum_1.SqlImportTarget.TABLE: {
                    const query = (0, sql_table_query_builder_1.createCheckSqlTableIdColumnUniquenessQuery)(dialect, idColumn, table);
                    isUnique = await sqlConnector.queryResult(query);
                    break;
                }
                case sql_import_target_enum_1.SqlImportTarget.SELECT: {
                    // const query = createCheckSelectColumnUniquenessQuery(
                    //   source,
                    //   idColumn,
                    //   select
                    // );
                    // isUnique = await sqlConnector.queryResult(query);
                    isUnique = true;
                    break;
                }
                default: {
                    throw new Error(`Unknown sql import target: ${target}`);
                }
            }
            sqlConnector.disconnect();
            return isUnique;
        }
        catch (error) {
            sqlConnector.disconnect();
            throw new Error(`Error while checking column uniqueness: ${error.message}`);
        }
    }
    async selectColumnsFromSchema(sqlConnector, table, dialect) {
        const columnsQuery = (0, sql_table_query_builder_1.createSqlTableFindColumnsQuery)(table, dialect);
        const retrievedColumns = await sqlConnector.queryRows(columnsQuery);
        return retrievedColumns.map((column) => {
            return {
                name: column['column_name'] || column['COLUMN_NAME'],
                type: column['data_type'] || column['DATA_TYPE']
            };
        });
    }
    async selectColumnsFromDataset(sqlConnector, query) {
        const retrievedDatasets = await sqlConnector.queryRows(query);
        if (retrievedDatasets.length === 0) {
            throw new Error('Error while quering columns: table is empty');
        }
        const dataset = retrievedDatasets[0];
        return Object.entries(dataset).map(([key, value]) => {
            return {
                name: key,
                type: typeof value
            };
        });
    }
}
exports.default = SqlColumnsHelper;
//# sourceMappingURL=sql-columns.helper.js.map
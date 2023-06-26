"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_connection_1 = require("../../../utils/sql/sql.connection");
const sql_dialect_map_1 = require("../../../utils/sql/sql.dialect-map");
const sql_query_builder_1 = require("../../../utils/sql/sql.query-builder");
class SQLColumnsService {
    async find(impt) {
        let sqlConnection;
        try {
            const { source, database } = impt;
            const { connection, idColumn, table, customSelect } = database;
            const dialect = sql_dialect_map_1.SQLDialectMap[source];
            sqlConnection = new sql_connection_1.SqlConnection({
                ...connection,
                dialect
            });
            await sqlConnection.connect();
            let columns = [];
            if (table) {
                try {
                    columns = await this.selectColumnsFromSchema(sqlConnection, table, source);
                    //Maybe user have no access to information schema then we receive columns from dataset
                }
                catch (error) {
                    const query = (0, sql_query_builder_1.createSelectDataQuery)(source, table, idColumn, 0, 1);
                    columns = await this.selectColumnsFromDataset(sqlConnection, query);
                }
            }
            else {
                const query = (0, sql_query_builder_1.paginateQuery)(source, customSelect, idColumn, 0, 1);
                columns = await this.selectColumnsFromDataset(sqlConnection, query);
            }
            sqlConnection.disconnect();
            return columns;
        }
        catch (error) {
            sqlConnection.disconnect();
            throw error;
        }
    }
    async checkIdColumnUniqueness(impt) {
        let sqlConnection;
        try {
            const { source, database } = impt;
            const { connection, idColumn, table, customSelect } = database;
            const dialect = sql_dialect_map_1.SQLDialectMap[source];
            sqlConnection = new sql_connection_1.SqlConnection({
                ...connection,
                dialect
            });
            await sqlConnection.connect();
            let isUnique;
            if (table) {
                const query = (0, sql_query_builder_1.createCheckTableColumnUniquenessQuery)(source, idColumn, table);
                isUnique = await sqlConnection.queryResult(query);
            }
            else {
                const query = (0, sql_query_builder_1.createCheckSelectColumnUniquenessQuery)(source, idColumn, customSelect);
                console.log(query);
                isUnique = await sqlConnection.queryResult(query);
            }
            sqlConnection.disconnect();
            return isUnique;
        }
        catch (error) {
            sqlConnection.disconnect();
            throw error;
        }
    }
    async selectColumnsFromSchema(sqlConnection, table, dialect) {
        const columnsQuery = (0, sql_query_builder_1.createSelectColumnsQuery)(table, dialect);
        const retrievedColumns = await sqlConnection.queryRows(columnsQuery);
        return retrievedColumns.map((column) => {
            return {
                name: column['column_name'] || column['COLUMN_NAME'],
                type: column['data_type'] || column['DATA_TYPE']
            };
        });
    }
    async selectColumnsFromDataset(sqlConnection, query) {
        const retrievedDatasets = await sqlConnection.queryRows(query);
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
exports.default = SQLColumnsService;
//# sourceMappingURL=sql-columns.service.js.map
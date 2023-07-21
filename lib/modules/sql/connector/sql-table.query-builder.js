"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSqlTableCountQuery = exports.createSqlTableFindDataQuery = exports.createSqlTableFindColumnsQuery = exports.createCheckSqlTableIdColumnUniquenessQuery = void 0;
function createCheckSqlTableIdColumnUniquenessQuery(dialect, idColumn, table) {
    if (dialect === 'Oracle' || dialect === 'Microsoft SQL Server') {
        return `
      SELECT CASE WHEN COUNT(${idColumn}) = COUNT(DISTINCT ${idColumn})
        THEN 1 ELSE 0 END AS has_no_duplicates
        FROM ${table};
    `;
    }
    else {
        return `
      SELECT COUNT(${idColumn}) = COUNT(DISTINCT ${idColumn}) AS has_no_duplicates
        FROM ${table};
    `;
    }
}
exports.createCheckSqlTableIdColumnUniquenessQuery = createCheckSqlTableIdColumnUniquenessQuery;
function createSqlTableFindColumnsQuery(table, dialect) {
    if (dialect === 'Oracle') {
        return `
      SELECT column_name, data_type
        FROM user_tab_columns
        WHERE table_name = '${table}';
    `;
    }
    else {
        return `
      SELECT column_name, data_type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = '${table}';
    `;
    }
}
exports.createSqlTableFindColumnsQuery = createSqlTableFindColumnsQuery;
function createSqlTableFindDataQuery(dialect, table, idColumn, offset, limit, requestedFields) {
    let query = 'SELECT ';
    if (requestedFields) {
        const fields = requestedFields.map((field) => `${field}`).join(', ');
        query += fields;
    }
    else {
        query += '*';
    }
    if (dialect === 'Microsoft SQL Server' || dialect === 'Oracle') {
        query += ` FROM ${table} ORDER BY ${idColumn} OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }
    else {
        query += ` FROM ${table} ORDER BY ${idColumn} LIMIT ${limit} OFFSET ${offset}`;
    }
    return query;
}
exports.createSqlTableFindDataQuery = createSqlTableFindDataQuery;
function createSqlTableCountQuery(table) {
    return `SELECT COUNT(*) FROM ${table}`;
}
exports.createSqlTableCountQuery = createSqlTableCountQuery;
//# sourceMappingURL=sql-table.query-builder.js.map
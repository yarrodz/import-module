"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelectCountQuery = exports.paginateQuery = exports.createSelectDataQuery = exports.createSelectColumnsQuery = exports.createCheckSelectColumnUniquenessQuery = exports.createCheckTableColumnUniquenessQuery = void 0;
function createCheckTableColumnUniquenessQuery(dialect, column, table) {
    if (dialect === 'Oracle' || dialect === 'Microsoft SQL Server') {
        return `
    SELECT CASE WHEN COUNT(${column}) = COUNT(DISTINCT ${column})
      THEN 1 ELSE 0 END AS has_no_duplicates
      FROM ${table};
  `;
    }
    else {
        return `
    SELECT COUNT(${column}) = COUNT(DISTINCT ${column}) AS has_no_duplicates
      FROM ${table};
  `;
    }
}
exports.createCheckTableColumnUniquenessQuery = createCheckTableColumnUniquenessQuery;
function createCheckSelectColumnUniquenessQuery(dialect, column, query) {
    if (query.endsWith(';')) {
        query = query.slice(0, -1);
    }
    if (dialect === 'Oracle' || dialect === 'Microsoft SQL Server') {
        return `
    SELECT CASE WHEN COUNT(${column}) = COUNT(DISTINCT ${column})
      THEN 1 ELSE 0 END AS has_no_duplicates
      FROM (${query}) custom_select;
  `;
    }
    else {
        return `
    SELECT COUNT(${column}) = COUNT(DISTINCT ${column}) AS has_no_duplicates
      FROM (${query}) custom_select;
  `;
    }
}
exports.createCheckSelectColumnUniquenessQuery = createCheckSelectColumnUniquenessQuery;
function createSelectColumnsQuery(table, dialect) {
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
exports.createSelectColumnsQuery = createSelectColumnsQuery;
function createSelectDataQuery(dialect, table, idColumn, offset, limit, requestedFields) {
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
exports.createSelectDataQuery = createSelectDataQuery;
function paginateQuery(dialect, query, idColumn, offset, limit) {
    let paginatedQuery = query.trim();
    if (paginatedQuery.endsWith(';')) {
        paginatedQuery = paginatedQuery.slice(0, -1);
    }
    if (dialect === 'Microsoft SQL Server' || dialect === 'Oracle') {
        paginatedQuery += ` ORDER BY ${idColumn} OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    }
    else {
        paginatedQuery += ` ORDER BY ${idColumn} LIMIT ${limit} OFFSET ${offset}`;
    }
    return paginatedQuery;
}
exports.paginateQuery = paginateQuery;
function createSelectCountQuery(table) {
    return `SELECT COUNT(*) FROM ${table}`;
}
exports.createSelectCountQuery = createSelectCountQuery;
//# sourceMappingURL=sql.query-builder.js.map
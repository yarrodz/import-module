"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateSqlSelect = void 0;
function paginateSqlSelect(select, idColumn, offset, limit) {
    let paginatedSelect = select.trim();
    const idPattern = /{{id}}/;
    const offsetPattern = /{{offset}}/;
    const limitPattern = /{{limit}}/;
    paginatedSelect = paginatedSelect.replace(idPattern, idColumn);
    paginatedSelect = paginatedSelect.replace(offsetPattern, String(offset));
    paginatedSelect = paginatedSelect.replace(limitPattern, String(limit));
    return paginatedSelect;
}
exports.paginateSqlSelect = paginateSqlSelect;
//   export function createCheckSqlSelectIdColumnUniquenessQuery(
//     dialect: string,
//     idColumn: string,
//     query: string
//   ) {
//     let paginatedQuery = paginateSqlSelect(query, idColumn, offset, limit);
//     if (dialect === 'Oracle' || dialect === 'Microsoft SQL Server') {
//       return `
//       SELECT CASE WHEN COUNT(${idColumn}) = COUNT(DISTINCT ${idColumn})
//         THEN 1 ELSE 0 END AS has_no_duplicates
//         FROM (${paginatedQuery}) custom_select;
//     `;
//     } else {
//       return `
//       SELECT COUNT(${idColumn}) = COUNT(DISTINCT ${idColumn}) AS has_no_duplicates
//         FROM (${paginatedQuery}) custom_select;
//     `;
//     }
//   }
//# sourceMappingURL=sql-select.query-builder.js.map
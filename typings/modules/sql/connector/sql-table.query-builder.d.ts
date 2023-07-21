export declare function createCheckSqlTableIdColumnUniquenessQuery(dialect: string, idColumn: string, table: string): string;
export declare function createSqlTableFindColumnsQuery(table: string, dialect: string): string;
export declare function createSqlTableFindDataQuery(dialect: string, table: string, idColumn: string, offset: number, limit: number, requestedFields?: string[]): string;
export declare function createSqlTableCountQuery(table: string): string;

export declare function createCheckTableColumnUniquenessQuery(dialect: string, column: string, table: string): string;
export declare function createCheckSelectColumnUniquenessQuery(dialect: string, column: string, query: string): string;
export declare function createSelectColumnsQuery(table: string, dialect: string): string;
export declare function createSelectDataQuery(dialect: string, table: string, idColumn: string, offset: number, limit: number, requestedFields?: string[]): string;
export declare function paginateQuery(dialect: string, query: string, idColumn: string, offset: number, limit: number): string;
export declare function createSelectCountQuery(table: string): string;

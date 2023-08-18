import { SqlConnectionConfig } from '../interfaces/sql.connection.interface';
export declare class SqlConnector {
    private connection;
    constructor(options: SqlConnectionConfig);
    connect(): Promise<void>;
    disconnect(): void;
    queryRows(str: string): Promise<object[]>;
    queryResult(str: string): Promise<any>;
}

import { Options } from 'sequelize';
export declare class SqlConnection {
    private connection;
    constructor(options: Options);
    connect(): Promise<void>;
    disconnect(): void;
    queryRows(str: string): Promise<object[]>;
    queryResult(str: string): Promise<any>;
}

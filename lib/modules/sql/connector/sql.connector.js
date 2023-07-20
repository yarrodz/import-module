"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlConnector = void 0;
const sequelize_1 = require("sequelize");
class SqlConnector {
    constructor(options) {
        this.connection = new sequelize_1.Sequelize({ ...options, logging: false });
    }
    async connect() {
        try {
            await this.connection.authenticate();
        }
        catch (error) {
            throw new Error(`Error while connecting to database: ${error.message}`);
        }
    }
    disconnect() {
        this.connection.close();
    }
    async queryRows(str) {
        try {
            const result = await this.connection.query(str, {
                type: sequelize_1.QueryTypes.SELECT
            });
            return result;
        }
        catch (error) {
            throw new Error(`Error while quering data: ${error.message}`);
        }
    }
    async queryResult(str) {
        try {
            const result = await this.connection.query(str, {
                type: sequelize_1.QueryTypes.SELECT
            });
            return Object.values(result[0])[0];
        }
        catch (error) {
            throw new Error(`Error while quering result: ${error.message}`);
        }
    }
}
exports.SqlConnector = SqlConnector;
//# sourceMappingURL=sql.connector.js.map
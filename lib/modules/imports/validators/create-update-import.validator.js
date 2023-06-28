"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUpdateImportValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const import_source_enum_1 = require("../enums/import-source.enum");
const database_import_target_enum_1 = require("../enums/database-import-target.enum");
const databaseValidator = joi_1.default.object({
    connection: joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        host: joi_1.default.string().required(),
        port: joi_1.default.number().integer().required(),
        database: joi_1.default.string().required()
    }).required(),
    idColumn: joi_1.default.string().required(),
    target: joi_1.default.string().valid(...Object.values(database_import_target_enum_1.DatabaseImportTarget)).required(),
    table: joi_1.default.string().allow(null),
    customSelect: joi_1.default.string().allow(null),
    datasetsCount: joi_1.default.number().integer().allow(null)
});
exports.CreateUpdateImportValidator = joi_1.default.object({
    unit: joi_1.default.string().length(24).required(),
    source: joi_1.default.string().valid(...Object.values(import_source_enum_1.ImportSource)).required(),
    database: databaseValidator
});
// export class CreateImportInput implements Omit<IImport, 'fields'> {
//   @IsString()
//   @Length(24, 24)
//   unit: string;
//   @IsIn(Object.values(ImportSource))
//   source: ImportSource;
//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => DatabaseInput)
//   database?: DatabaseInput;
//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => ApiInput)
//   api?: ApiInput;
//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => ImapInput)
//   imap?: ImapInput;
// }
// export class DatabaseInput implements IDatabase {
//   @ValidateNested({ each: true })
//   @Type(() => DatabaseConnectionInput)
//   connection: DatabaseConnectionInput;
//   @IsString()
//   idColumn: string;
//   @IsOptional()
//   @IsString()
//   table?: string;
//   @IsOptional()
//   @IsString()
//   customSelect?: string;
//   @IsOptional()
//   @IsInt()
//   datasetsCount?: number;
// }
// export class DatabaseConnectionInput implements IDatabaseConnection {
//   @IsString()
//   username: string;
//   @IsString()
//   password: string;
//   @IsString()
//   database: string;
//   @IsString()
//   host: string;
//   @IsInt()
//   port: number;
// }
// export class ApiInput implements IApi {
//   @ValidateNested({ each: true })
//   @Type(() => ApiRequestConfigInput)
//   requestConfig: ApiRequestConfigInput;
//   @IsString()
//   idColumn: string;
//   @IsString()
//   path: string;
// }
// export class ApiRequestConfigInput implements IApiRequestConfig {
//   @IsIn(Object.values(RequestMethod))
//   method: RequestMethod;
//   @IsString()
//   url: string;
//   @IsOptional()
//   @IsObject()
//   headers?: object;
//   @IsOptional()
//   @IsObject()
//   data?: object;
//   @IsOptional()
//   @IsObject()
//   params?: object;
// }
// export class ImapInput implements IImap {
//   @ValidateNested({ each: true })
//   @Type(() => ImapConnectionInput)
//   connection: ImapConnectionInput;
// }
// export class ImapConnectionInput implements IImapConnection {
//   @IsString()
//   user: string;
//   @IsString()
//   password: string;
//   @IsString()
//   host: string;
//   @IsInt()
//   port: number;
//   @IsBoolean()
//   tls: boolean;
// }
//# sourceMappingURL=create-update-import.validator.js.map
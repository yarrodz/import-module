"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const import_source_enum_1 = require("./enums/import-source.enum");
const sql_schema_1 = require("../sql/sql.schema");
const api_schema_1 = require("../api/api.schema");
const field_schema_1 = require("./sub-schemas/field.schema");
const ImportSchema = new mongoose_1.Schema({
    unit: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Unit', required: true },
    source: {
        type: String,
        enum: Object.values(import_source_enum_1.ImportSource),
        required: true
    },
    sql: { type: sql_schema_1.SqlSchema, required: false },
    api: { type: api_schema_1.ApiSchema, required: false },
    limitRequestsPerSecond: { type: Number, required: false },
    fields: [{ type: field_schema_1.FieldSchema }],
    idColumn: { type: String, required: true },
    datasetsCount: { type: Number, required: false }
});
exports.default = mongoose_1.default.model('Import', ImportSchema);
//# sourceMappingURL=import.schema.js.map
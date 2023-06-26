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
exports.ImportProcessSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const import_status_enum_1 = require("./enums/import-status.enum");
exports.ImportProcessSchema = new mongoose_1.Schema({
    unit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Unit' },
    import: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Import' },
    status: {
        type: String,
        enum: Object.values(import_status_enum_1.ImportStatus),
        default: import_status_enum_1.ImportStatus.PENDING
    },
    datasetsCount: { type: Number, default: 0 },
    processedDatasetsCount: { type: Number, default: 0 },
    transferedDatasetsCount: { type: Number, default: 0 },
    log: [{ type: String }],
    attempts: { type: Number, default: 0 },
    errorMessage: { type: String, required: false }
});
exports.default = mongoose_1.default.model('ImportProcess', exports.ImportProcessSchema);
//# sourceMappingURL=import-process.schema.js.map
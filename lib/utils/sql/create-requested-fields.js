"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestedFields = void 0;
function createRequestedFields(fields, idColumn) {
    const requestedFields = fields.map(({ source }) => source);
    if (!requestedFields.includes(idColumn)) {
        requestedFields.push(idColumn);
    }
    return requestedFields;
}
exports.createRequestedFields = createRequestedFields;
//# sourceMappingURL=create-requested-fields.js.map
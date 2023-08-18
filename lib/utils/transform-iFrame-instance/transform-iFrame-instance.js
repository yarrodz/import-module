"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformIFrameInstance(instance) {
    if (instance === undefined) {
        return undefined;
    }
    else {
        return {
            id: instance.id,
            ...instance.properties
        };
    }
}
exports.default = transformIFrameInstance;
//# sourceMappingURL=transform-iFrame-instance.js.map
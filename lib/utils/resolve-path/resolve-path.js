"use strict";
//Resolve nested object property and array items using string(path) with dots and brackets
//path: 'data.prop1[prop2]['prop3']["prop4"]'
Object.defineProperty(exports, "__esModule", { value: true });
function resolvePath(data, path) {
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    let parts = path.split('.');
    for (let i = 0; i < parts.length; i++) {
        let key = parts[i];
        if (key in data) {
            data = data[key];
        }
        else {
            return;
        }
    }
    return data;
}
exports.default = resolvePath;
//# sourceMappingURL=resolve-path.js.map
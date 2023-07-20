"use strict";
// [1,2,3,4,5,6,7,8,9] => [[1,2,3],[4,5,6],[7,8,9]]
Object.defineProperty(exports, "__esModule", { value: true });
function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunkedArray.push(chunk);
    }
    return chunkedArray;
}
exports.default = chunkArray;
//# sourceMappingURL=chunk-array.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileType = void 0;
function checkFileType(file, callback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
        return callback(null, true);
    }
    else {
        callback(new Error("Error: Allowed file types is (.jpg, .jpeg, .png)"));
    }
}
exports.checkFileType = checkFileType;

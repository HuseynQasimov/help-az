import { FileFilterCallback } from "multer";

export function checkFileType(file: Express.Multer.File, callback: FileFilterCallback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return callback(null, true);
    } else {
        callback(new Error("Error: Allowed file types is (.jpg, .jpeg, .png)"));
    }
}

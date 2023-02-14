import multer from 'multer';
import path, { resolve } from 'path';
import slugify from "slugify";
import fs from 'fs';

export const uploadFile = (directory, field = "file") => {
    const dir = resolve('public/uploads/files', directory);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true});
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, slugify(req.body[field].toLowerCase()) + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    return upload.single('cv');
}

export const uploadImage = (directory, field = "name") => {
    const dir = resolve('public/uploads/images', directory);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true});
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, slugify(req.body[field].toLowerCase()) + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    return upload.single('image');
}

export const deleteFile = (path) => {
    if (fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

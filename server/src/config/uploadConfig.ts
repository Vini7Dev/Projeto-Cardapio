/**
 * Upload Configuration
 */

import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');

export default {
    // Disk storage provider config.
    tempFolder,
    uploadsFolder,
    storage: multer.diskStorage({
        destination: tempFolder,
        filename: (req, file, callBack) => {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callBack(null, fileName);
        },
    }),
};

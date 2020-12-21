/**
 * Disk Storage Provider
 */

import fs from 'fs';
import path from 'path';

import uploadConfig from '../../../../../config/uploadConfig';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    // Saving file in disk storage (uploads folder)
    public async saveFile(fileName: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tempFolder, fileName),
            path.resolve(uploadConfig.uploadsFolder, fileName),
        );

        return fileName;
    }

    // Deleting files from the uploads folder
    public async deleteFile(fileName: string): Promise<void> {
        const fileDir = path.resolve(uploadConfig.uploadsFolder, fileName);

        try {
            await fs.promises.stat(fileDir);
        } catch {
            return;
        }

        await fs.promises.unlink(fileDir);
    }
}

export default DiskStorageProvider;

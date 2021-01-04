/**
 * Fake: Storage Provider
 */

import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    // Saving file in disk storage (uploads folder)
    public async saveFile(fileName: string): Promise<string> {
        this.storage.push(fileName);

        return fileName;
    }

    // Deleting file from the uploads folder
    public async deleteFile(fileName: string): Promise<void> {
        const fileNameIndex = this.storage.findIndex(
            fileNameSaved => fileNameSaved === fileName,
        );

        this.storage.splice(fileNameIndex, 1);
    }

    // Deleting file from the temp folder
    public async deleteFileFromTemp(fileName: string): Promise<void> {
        const fileNameIndex = this.storage.findIndex(
            fileNameSaved => fileNameSaved === fileName,
        );

        this.storage.splice(fileNameIndex, 1);
    }
}

export default FakeStorageProvider;

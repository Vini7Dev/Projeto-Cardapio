/**
 * Fake: Storage Provider
 */

import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async saveFile(fileName: string): Promise<string> {
        this.storage.push(fileName);

        return fileName;
    }

    public async deleteFile(fileName: string): Promise<void> {
        const fileNameIndex = this.storage.findIndex(
            fileNameSaved => fileNameSaved === fileName,
        );

        this.storage.splice(fileNameIndex, 1);
    }
}

export default FakeStorageProvider;

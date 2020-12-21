/**
 * Storage Provider Interface
 */

interface IStorageProvider {
    saveFile(fileName: string): Promise<string>; // Saving file in disk storage (uploads file)
    deleteFile(fileName: string): Promise<void>; // Deleting files from the uploads folder
}

export default IStorageProvider;

/**
 * Storage Provider Interface
 */

interface IStorageProvider {
    saveFile(fileName: string): Promise<string>; // Saving file in disk storage (uploads file)
    deleteFile(fileName: string): Promise<void>; // Deleting file from the uploads folder
    deleteFileFromTemp(fileName: string): Promise<void> // Deleting file from the temp folder
}

export default IStorageProvider;

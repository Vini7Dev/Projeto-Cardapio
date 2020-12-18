/**
 * Hash Provider Interface
 */

interface IHashProvider {
    generateHash(toHash: string): Promise<string>; //Generate Hash
    compareHash(noHashed: string, hashed: string): Promise<boolean>; //Compare Hash
}

export default IHashProvider;

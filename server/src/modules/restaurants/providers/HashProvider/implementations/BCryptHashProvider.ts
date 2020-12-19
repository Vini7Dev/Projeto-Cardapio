/**
 * BCriptJS Hash Provider
 */

import { hash, compare } from 'bcryptjs';
import IHashProvider from '../modules/IHashProvider';

class BCryptHashProvider implements IHashProvider {
    // Generate hash
    public async generateHash(toHash: string): Promise<string> {
        const cryptoString = await hash(toHash, 8);

        return cryptoString;
    }

    // Compare hash
    public async compareHash(
        noHashed: string,
        hashed: string,
    ): Promise<boolean> {
        const isValid = await compare(noHashed, hashed);

        return isValid;
    }
}

export default BCryptHashProvider;

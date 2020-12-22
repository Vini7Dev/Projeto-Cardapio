/**
 * Fake: Hash Provider
 */

import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async generateHash(noHashed: string): Promise<string> {
        return noHashed;
    }

    public async compareHash(
        noHashed: string,
        hashed: string,
    ): Promise<boolean> {
        return noHashed === hashed;
    }
}

export default FakeHashProvider;

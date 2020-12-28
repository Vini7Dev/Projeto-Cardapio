/**
 * Authentication Configuration
 */

export default {
    // Token Configuration
    token: {
        secret: process.env.APP_TOKEN_SECRET || 'default',
        expiresIn: process.env.APP_TOKEN_EXPIRES_IN || '1d',
    },
};

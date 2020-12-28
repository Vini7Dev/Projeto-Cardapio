/**
 * Authentication Configuration
 */

export default {
    // Token Configuration
    token: {
        secret: process.env.APP_TOKEN_SECRET,
        expiresIn: process.env.APP_TOKEN_EXPIRES_IN,
    },
};

module.exports = {
    PORT: process.env.port || 7777,
    ROLES: {
        USER: 'user',
        ADMIN: 'admin'
    },
    jwtSecret: '!t1e1st!',
    jwtExpiration: 60 * 60,
}
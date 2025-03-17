export default {
    port: process.env.PORT || 3333,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        connectString: process.env.DATABASE_CONNECTION_STRING,
    },
};

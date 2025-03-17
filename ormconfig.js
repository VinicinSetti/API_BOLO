const config = process.env.NODE_ENV === 'production' ? require('./dist/config/index.js').default : require('./src/config/index.ts').default;

const srcConfig = {
    type: "postgres",
    username: config.database.username,
    host: config.database.host,
    password: config.database.password,
    database: config.database.database,
    entities: ["./src/modules/**/typeorm/entities/*.ts"],
    migrations: [
        "./src/shared/typeorm/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "./src/shared/typeorm/migrations"
    }
}

const distConfig = {
    type: "postgres",
    username: config.database.username,
    host: config.database.host,
    password: config.database.password,
    database: config.database.database,
    entities: ["./dist/modules/**/typeorm/entities/*.ts"],
    migrations: [
        "./dist/shared/typeorm/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "./dist/shared/typeorm/migrations"
    }
}

module.exports = process.env.NODE_ENV === 'production' ? distConfig : srcConfig;

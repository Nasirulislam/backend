var dotenv = require('dotenv');
dotenv.config();

module.exports = {

    development: {
        client: 'mysql',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
        connection: {
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME
        }
    },
    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: 'mysql',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        connection: {
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME
        }
    }
};

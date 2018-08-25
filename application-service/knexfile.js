
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
            host     : 'db',
            user     : 'gzm',
            password : 'gzm',
            database : 'gzm'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host     : process.env.GZM_DATABASE_HOST,
            user     : process.env.GZM_DATABASE_USER,
            password : process.env.GZM_DATABASE_PASSWORD,
            database : process.env.GZM_DATABASE_NAME
        }
    }
};

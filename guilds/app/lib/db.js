const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    post: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    sslmode: require
  })

pool.connect(function(err) {
    if (err) throw err;
});

module.exports = {
  pool
}

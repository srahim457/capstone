const { Pool } = require('pg');

require('dotenv').config({ path: '../../.env' });

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  sslmode: require,
  max: 20,
});

pool.connect(function (err) {
  if (err) throw err;
});

module.exports = {
  pool,
};

const Pool = require('pg').Pool
// what is pool
// A pool is a collection of clients maintained by a node-postgres process which has a shared set of parameters and a shared client configuration.
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'students',
password: 'comsats575',
port: 5432,
})
module.exports = pool;

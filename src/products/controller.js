const pool = require('../../db');
const queries=require('./queries');
const getProducts = (req, res) => {
    pool.query( queries.getProducts,(error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
    )
}
const getProductsById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getProductsById,[id],(error, results) => {
        // purpose of [id]
        // The $1 syntax is used to avoid SQL injection attacks. It is a good practice to use parameterized queries instead of string concatenation when building SQL queries.
        
        if (error) {
            throw error
        } res.status(200).json(results.rows[0])
    }
    )
}

module.exports = {  
    getProducts,
    getProductsById,
}

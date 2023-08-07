const pool = require('../../db');
const queries=require('./queries');
const getStudents = (req, res) => {
    pool.query( queries.getStudents,(error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
    )
}
const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentsById,[id],(error, results) => {
        // purpose of [id]
        // The $1 syntax is used to avoid SQL injection attacks. It is a good practice to use parameterized queries instead of string concatenation when building SQL queries.
        
        if (error) {
            throw error
        } res.status(200).json(results.rows)
    }
    )
}
const addStudent = (req, res) => {
    const { name, email, age ,dob} = req.body
    pool.query(queries.addStudent,[name, email, age ,dob],(error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send('Student added successfully')
    }
    )
}
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email, age ,dob} = req.body
    pool.query(queries.updateStudent,[name, email, age ,dob,id],(error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Student modified with ID: ${id}`)
    }
    )
}
const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {

            throw error
        }
        res.status(200).send(`Student deleted with ID: ${id}`)
    }
    )   
}


module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    updateStudent,
    deleteStudent

}

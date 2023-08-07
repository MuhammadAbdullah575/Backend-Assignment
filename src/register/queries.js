const getuser= 'SELECT * FROM users1'
const addUser= 'INSERT INTO users1 (user_name, user_email,user_password) VALUES ($1, $2, $3)'
const getUserByEmail='SELECT * FROM users1 WHERE user_email = $1'

module.exports={
    addUser,
    getuser,
    getUserByEmail
}

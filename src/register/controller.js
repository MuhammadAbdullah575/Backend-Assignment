const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const addUser = (req, res) => {
  const { name, email, password } = req.body;
  pool.query(queries.getuser, (error, results) => {
    if (error) {
      throw error;
    }
    for (let i = 0; i < results.rows.length; i++) {
      if (results.rows[i].user_email === email) {
        res.status(400).send("User already exists");
        return;
      }
    }
    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) {
        throw saltErr;
      }
      bcrypt.hash(password, salt, (hashErr, hashedPassword) => {
        if (hashErr) {
          throw hashErr;
        }
        pool.query(
          queries.addUser,
          [name, email, hashedPassword],
          (error, results) => {
            if (error) {
              throw error;
            }

            // User added successfully. Generate a JWT token and send it back to the client.
            const token = jwt.sign({ email }, "your-secret-key", {
              expiresIn: "1h",
            });
            res.status(201).json({ message: "User added successfully", token });
          }
        );
      });
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query(queries.getUserByEmail, [email]);
    if(!users){
      return res.status(401).send("User does not exist");
    }
    else{
      const Match = await bcrypt.compare(password, users.rows[0].user_password);
      if(!Match){
        return res.status(201).json({message:"Incorrect password"});
      }
    }
    const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });
    res.status(201).json({ message: "User login successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred during login.");
  }
};

const getUser = (req, res) =>
  pool.query(queries.getuser, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
module.exports = {
  addUser,
  getUser,
  login,
};

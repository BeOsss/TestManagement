import express from 'express';
import mysql from 'mysql'

const router = express.Router();

const connectionOption = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "TestManagement",
    password: "DevUser123!#",
    database: "test_management"
});

export const createUser = function (req, callback) {
    const user = req.body;
    connectionOption.query(`INSERT INTO \`test_management\`.\`users\` (\`user_name\`, \`password\`) VALUES ('${user.username}', '${user.password}');`, function (err, result) {
        callback(err ? err : `${user.username} has been added to the Database`);
    });
}

export const getUsers = function (callback) {
    connectionOption.query(`SELECT * FROM users;`, function (err, result) {
        callback(err ? err : result)
    });
}

export const getUserByID = function (req, callback) {
    const { id } = req.params;
    connectionOption.query(`SELECT * FROM users where id = ${id}`, function (err, result) {
        callback(err ? err : result)
    });
}

export const getUserByUsername = function (req, callback) {
    const username = req.body.username;
    connectionOption.query(`SELECT * FROM users where user_name = "${username}"`, function (err, result) {
        callback(err, result)
    });
}

export const deleteUser = function (req, callback) {
    const { id } = req.params;

    connectionOption.query(`DELETE FROM users WHERE id = ${id}`, function (err) {
        callback(err ? err : `${id} deleted successfully from database`);
    });
}

export const updateUser = function (req, callback){
    const { id } = req.params;
    const user = req.body;

    connectionOption.query('UPDATE users SET user_name = ?, password = ? WHERE id = ?', [user.username, user.password, id], function (err) {
        callback(err ? err : `${id} update successfully from database`)
    });
}

export default router
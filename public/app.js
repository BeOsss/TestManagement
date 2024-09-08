'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

express.Router();

const connectionOption = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "TestManagement",
    password: "DevUser123!#",
    database: "test_management"
});

const createUser = function (req, callback) {
    const user = req.body;
    connectionOption.query(`INSERT INTO \`test_management\`.\`users\` (\`user_name\`, \`password\`) VALUES ('${user.username}', '${user.password}');`, function (err, result) {
        callback(err ? err : `${user.username} has been added to the Database`);
    });
};

const getUsers = function (callback) {
    connectionOption.query(`SELECT * FROM users;`, function (err, result) {
        callback(err ? err : result);
    });
};

const getUserByID = function (req, callback) {
    const { id } = req.params;
    connectionOption.query(`SELECT * FROM users where id = ${id}`, function (err, result) {
        callback(err ? err : result);
    });
};

const getUserByUsername = function (req, callback) {
    const username = req.body.username;
    connectionOption.query(`SELECT * FROM users where user_name = "${username}"`, function (err, result) {
        callback(err, result);
    });
};

const deleteUser = function (req, callback) {
    const { id } = req.params;

    connectionOption.query(`DELETE FROM users WHERE id = ${id}`, function (err) {
        callback(err ? err : `${id} deleted successfully from database`);
    });
};

const updateUser = function (req, callback){
    const { id } = req.params;
    const user = req.body;

    connectionOption.query('UPDATE users SET user_name = ?, password = ? WHERE id = ?', [user.username, user.password, id], function (err) {
        callback(err ? err : `${id} update successfully from database`);
    });
};

const router$1 = express.Router();

router$1.post('/', (req, res) => {
  createUser(req, (data) => {
    res.send(data);
  });
});

router$1.get('/', (_ , res) => {
  getUsers((data)=>{
    res.send(data);
  });
});

router$1.get('/:id', (req, res) => {
  getUserByID(req, (data)=>{
    res.send(data);
  });
});

router$1.delete('/:id', (req, res) => {
  deleteUser(req, (data)=>{
    res.send(data);
  });
});

router$1.patch('/:id', (req, res) => {
  updateUser(req, (data)=>{
    res.send(data);
  });
});

const router = express.Router();

router.post("/", (req, res) => {
    getUserByUsername(req, (err, result) => {
        res.send(err || !result[0] ? "Login unsuccessful": "Login successful");
    });
});

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', router$1);

app.use('/login', router);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

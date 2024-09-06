import express from 'express';
import mysql from 'mysql'
import {createUser, getUsers, getUserByID, deleteUser, updateUser} from '../controllers/userController.js'

const router = express.Router();

const connectionOption = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "TestManagement",
  password: "DevUser123!#",
  database: "test_management"
});

router.post('/', (req, res) => {
  createUser(req, (data) => {
    res.send(data)
  })
})

router.get('/', (_ , res) => {
  getUsers((data)=>{
    res.send(data);
  })
})

router.get('/:id', (req, res) => {
  getUserByID(req, (data)=>{
    res.send(data);
  })
});

router.delete('/:id', (req, res) => {
  deleteUser(req, (data)=>{
    res.send(data);
  })
});

router.patch('/:id', (req, res) => {
  updateUser(req, (data)=>{
    res.send(data);
  })
  // const { id } = req.params;
  // const user = req.body;

  // const username = user.username ? `user_name = '${user.username}' ` : "";
  // const password = user.password ? `password = '${user.password}' ` : "";
  // const list = [username, password].every(x => x !== "");

  // connectionOption.query(
  //   `UPDATE users SET ${username}${list? ",": ""}${password} WHERE id = ${id}`, function (err) {
  //   if (err) res.send(err);
  //   res.send(`${id} update successfully from database`);
  // });
});

export default router
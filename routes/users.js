import express from 'express';
import {createUser, getUsers, getUserByID, deleteUser, updateUser} from '../controllers/userController.js'

const router = express.Router();

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
});

export default router
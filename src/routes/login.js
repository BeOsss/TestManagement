import express from 'express';
import { getUserByUsername } from '../controllers/userController.js'

const router = express.Router();

router.post("/", (req, res) => {
    getUserByUsername(req, (err, result) => {
        res.send(err || !result[0] ? "Login unsuccessful": "Login successful")
    })
})

export default router;
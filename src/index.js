import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use('/login', loginRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
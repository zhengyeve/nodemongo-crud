const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const connectDb = require('./config/db')

// /Users/eve.zheng/dev/nodemongo-crud/app.js
const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// In-memory "database" for demo purposes
let users = [];
let nextId = 1;

// Home page
app.get('/', (req, res) => {
    res.send('Hello World');
});

// // /user routes
// const userRouter = express.Router();

// // List users
// userRouter.get('/', (req, res) => {
//     res.json(users);
// });

// // Create user
// userRouter.post('/', (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) return res.status(400).json({ error: 'name and email required' });
//     const user = { id: nextId++, name, email };
//     users.push(user);
//     res.status(201).json(user);
// });

// // Get user by id
// userRouter.get('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);
//     if (!user) return res.status(404).json({ error: 'user not found' });
//     res.json(user);
// });

// // Update user
// userRouter.put('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);
//     if (!user) return res.status(404).json({ error: 'user not found' });
//     const { name, email } = req.body;
//     if (name) user.name = name;
//     if (email) user.email = email;
//     res.json(user);
// });

// // Delete user
// userRouter.delete('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const index = users.findIndex(u => u.id === id);
//     if (index === -1) return res.status(404).json({ error: 'user not found' });
//     const deleted = users.splice(index, 1)[0];
//     res.json(deleted);
// });

// app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
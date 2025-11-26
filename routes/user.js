const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        const { name, password } = req.body;

        if (name === 'admin' && password === 'admin') {
            return res.status(200).send('welcom to admin page');
        }

        if (!name || !password) {
            return res.status(200).send('plase enter a name and password');
        }

        const existing = await User.findOne({ name });
        if (existing) {
            return res.status(409).send('User already exists');
        }

        const user = new User({ name, password });
        await user.save();

        return res.status(201).send('User created');
    } catch (err) {
        console.error(err.stack);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
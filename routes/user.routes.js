const express = require('express');

module.exports = app => {

    const users = require('../controllers/user.controller.js');

    const router = express.Router();

    // create new user
    router.post("/", users.create)

    // retrieve all users
    router.get("/", users.findAll)

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Delete all Users
    router.delete("/", users.deleteAll);



    app.use("/api/users", router)
}